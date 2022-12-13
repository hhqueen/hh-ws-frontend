import { useState, useEffect, Suspense } from 'react'
import { useParams } from "react-router-dom"
import showApplicableFilters from "../../helperFunctions/showApplicableFilters"
import { siteSettings } from "../../sourceData/siteSettings"

import { FaDirections } from "react-icons/fa"
import { TbPhoneCall } from "react-icons/tb"

import axios from "axios"

//Components
import HHHours from '../HHHours'
import MenuItems from '../MenuItems'
import LoadingComp from '../LoadingComp'

export default function RestDetail() {
  let { id } = useParams()
  const [restData, setRestData] = useState({
    hourSet: {
      hours: []
    },
    cuisines: [],
    menu: {
      foodSpecialsDescription: "",
      drinkSpecialsDescription: "",
      foodMenu: [],
      drinkMenu: []
    }
  })
  const [isLoaded, setIsloaded] = useState(false)
  const [address, setAddress] = useState("")
  useEffect(() => {
    console.log(id)
    const getRestData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants/${id}`)
        console.log("async data", response.data)
        // console.log("foodAndDrinkMenuImg.imgUrl",response.data.menu.foodAndDrinkMenuImg.imgUrl)
        await setRestData(response.data)
        // console.log("rest hours?", response.data.hours)
        // setRestHours(response.data.hours)
        // setCuisineString(response.data.cuisines.join(", "))

        // setFilterString(
        //   showApplicableFilters(response.data)
        // )
        await setAddress(`${response.data.address1} ${response.data.city} ${response.data.state} ${response.data.zip_code}`)

        setIsloaded(true)
        // setIsloaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    getRestData()
  }, [id])

  const mapHours = restData.hourSet.hours.map((hour, idx) => {
    return (
      <HHHours
        key={`${id}-${hour}-${idx}`}
        hour={hour}
        timeOutputVal={1}
      />
    )
  })

  return (

    <>
      { !isLoaded && <LoadingComp /> }
      {
        isLoaded &&

          <div
            className='mt-[60px] px-3'
          >
            < img src={restData?.image_url} alt={restData?.name} />
            <div
              className='py-3'
            >
              <p>{restData?.name}</p>
              <p>{restData?.cuisines.join(", ")}</p>
              <p>{showApplicableFilters(restData.filterParams)}</p>

              <a
                href={`https://www.google.com/maps/place/${address.replace(" ", "+")}`}
                target="_blank"
                className="flex"
                rel="noopener noreferrer">
                <FaDirections />
                <p
                  className='text-[blue] underline'
                >{address}</p>
              </a>
              <a
                href={`tel:${restData?.telNumber}`}
                className="flex"
              >
                <TbPhoneCall />
                <p
                  className='text-[blue] underline'
                >{restData.displayNumber}</p>
              </a>
            </div>
            {/* Hour Header */}
            <div
              className='grid grid-cols-7 pl-3'
            >
              <p
                className={`text-[11px] justify-items-start col-start-1 col-end-1 `}
              >Day</p>

              <p
                className={`text-[11px] justify-items-start flex mx-5 col-start-2 col-span-3`}
              >Happy Hour</p>

              <p
                className={`text-[11px] justify-items-start flex mx-5 col-start-5 col-span-3`}
              >Late Night</p>
            </div>
            <div
              className='py-3'
            >
              {mapHours}
            </div>

            <div
            >
              {
                restData.menu.isFoodAndDrinkMenu &&
                <>
                  <div
                    className='flex flex-col items-center justify-center py-3'>
                    <p
                      className='border-b'
                    >Food And Drink Menu</p>
                    <img
                      src={`${restData.menu.foodAndDrinkMenuImg?.imgUrl}`}
                      alt="image"
                    />
                  </div>
                </>
              }

              {!restData.menu.isFoodAndDrinkMenu &&
                <>
                  {
                    restData.menu.drinkMenuImg !== null &&

                    <div
                      className='flex flex-col items-center justify-center py-3'>
                      <p
                        className='border-b'
                      >Food Menu</p>
                      {
                        siteSettings.showMenuImg ?
                          <>
                            <img
                              src={`${restData.menu.foodMenuImg?.imgUrl}`}
                              alt="image"
                            />
                          </>
                          :
                          <>
                            <p
                              className='px-10 text-center'
                            >{restData?.menu.foodSpecialsDescription}</p>
                            <MenuItems
                              ItemsArr={restData?.menu.foodMenu}
                              menuType="Food"
                            />
                          </>
                      }
                    </div>
                  }

                  {
                    restData.menu.drinkMenuImg !== null &&
                    <div
                      className='flex flex-col items-center justify-center py-3'
                    >
                      <p
                        className='border-b'
                      >Drink Menu</p>
                      {
                        siteSettings.showMenuImg ?
                          <>
                            <img
                              src={`${restData.menu.drinkMenuImg?.imgUrl}`}
                              alt="image"
                            />
                          </>
                          :
                          <>
                            <p
                              className='px-10 text-center'
                            >{restData?.menu.drinkSpecialsDescription}</p>
                            <MenuItems
                              ItemsArr={restData?.menu.drinkMenu}
                              menuType="Drink"
                            />
                          </>
                      }
                    </div>
                  }
                </>
              }
            </div>
          </div>
      }
    </>
  )
}
