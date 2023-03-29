import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import showApplicableFilters from "../../helperFunctions/showApplicableFilters"
import { siteSettings } from "../../sourceData/siteSettings"

import { FaDirections } from "react-icons/fa"
import { TbPhoneCall } from "react-icons/tb"

import axios from "axios"
//Components
// import HHHours from '../HHHours/HHHours'
import HHHoursContainer from '../HHHours/HHHoursContainer'
import MenuItems from '../MenuItems'
import LoadingComp from '../LoadingComp'
import EditDeleteRestComp from '../EditDeleteRestComp'
import apiLogger from '../../helperFunctions/apiLogger'
import qStringfromObj from '../../helperFunctions/qStringfromObj'
import jwtDecode from 'jwt-decode'

export default function RestDetail({ mainDivStyle }) {
  let { id } = useParams()
  const componentName = "RestDetail"
  const menuImgClassName = 'w-[800px] max-w-full'

  const emailProps = {
    email: "hhqueen.official@gmail.com",
    subject: `Restaurant Information is Wrong! id: ${id}`,
    body: "Please tell us what is wrong:"
  }

  const [restData, setRestData] = useState({
    hourSet: {
      hours: []
    },
    cuisines: [],
    menu: {
      foodSpecialsDescription: "",
      drinkSpecialsDescription: "",
      foodMenu: [],
      drinkMenu: [],
      foodAndDrinkMenuImg: null,
      foodMenuImg: null,
      drinkMenuImg: null
    }
  })
  const [isLoaded, setIsloaded] = useState(false)
  const [address, setAddress] = useState("")

  const dateString = () => {
    const updatedDate = restData.updatedAt
    const year = updatedDate.substring(0, 4)
    const month = updatedDate.substring(5, 7)
    const day = updatedDate.substring(8, 10)
    return `${month}/${day}/${year}`
  }
  useEffect(() => {
    console.log(id)
    const getRestData = async () => {
      try {
        const qString = qStringfromObj({
          UI_ComponentName: componentName,
          userId: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).id : null,
          screenWidth: window.innerWidth,
          screenHeight: window.screenHeight
        })
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants/${id}${qString}`)
        console.log("async data", response.data)
        setRestData(response.data)
        setAddress(`${response.data.address1} ${response.data.city} ${response.data.state} ${response.data.zip_code}`)
        setIsloaded(true)
      } catch (error) {
        console.log(error)
      }
    }
    getRestData()
  }, [id])

  const mapHours = restData.hourSet.hours.map((hour, idx) => {
    return (
      <HHHoursContainer
        key={`${id}-${hour}-${idx}`}
        hour={hour}
        timeOutputVal={1}
      />
    )
  })

  return (

    <>
      {!isLoaded && <LoadingComp />}
      {
        isLoaded &&

        <div
          style={mainDivStyle}
          className='md:flex md:flex-col mt-[200px] md:items-center'
        >
          <div
            className='md:flex md:px-10'
          >
            <div
              className='relative md:w-[35vw]'
            >
              <img
                className='md:w-full md:max-h-[300px] md:object-cover'
                src={restData?.image_url}
                alt={restData?.name} />
              <EditDeleteRestComp
                id={restData._id}
              />
            </div>

            <div
              className='px-10'
            >
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
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    apiLogger(e, componentName, `a_Address_RestaurantId: ${id}`)
                  }}
                >
                  <FaDirections />
                  <p
                    className='text-[blue] underline'
                  >{address}</p>
                </a>
                <a
                  href={`tel:${restData?.telNumber}`}
                  className="flex"
                  onClick={(e) => {
                    apiLogger(e, componentName, `a_PhoneNumber_RestaurantId: ${id}`)
                  }}
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
            </div>
          </div>

          <div
            className='w-full flex flex-col md:flex-row'
          >
            {
              restData?.menu?.isFoodAndDrinkMenu &&
              <>
                <div
                  className='flex flex-col items-center justify-center py-3 w-full'>
                  <p
                    className='border-b'
                  >Food And Drink Menu</p>
                  <img
                    className={menuImgClassName}
                    src={`${restData?.menu?.foodAndDrinkMenuImg?.imgUrl}`}
                    alt="image"
                  />
                </div>
              </>
            }

            {!restData?.menu?.isFoodAndDrinkMenu &&
              <>
                {
                  restData?.menu?.foodMenuImg !== null &&

                  <div
                    className='flex flex-col items-center justify-center py-3  w-full'>
                    <p
                      className='border-b'
                    >Food Menu</p>
                    {
                      siteSettings.showImgMenu ?
                        <>
                          <img
                            className={menuImgClassName}
                            src={`${restData?.menu?.foodMenuImg?.imgUrl}`}
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
                  restData?.menu?.drinkMenuImg !== null &&
                  <div
                    className='flex flex-col items-center justify-center py-3  w-full'
                  >
                    <p
                      className='border-b'
                    >Drink Menu</p>
                    {
                      siteSettings.showImgMenu ?
                        <>
                          <img
                            className={menuImgClassName}
                            src={`${restData?.menu?.drinkMenuImg?.imgUrl}`}
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

          <div
            className='flex items-center justify-around'
          >
            <div
              className='flex items-center justify-center text-center'
            >
              <p>{`Last Updated: ${dateString()}`}</p>
            </div>

            <div
              className='flex items-center justify-center text-center'
            >
              <a
                href={`mailto:${emailProps.email}?subject=${emailProps.subject}&body=${emailProps.body}`}
                className="ml-10"
              >
                <p
                  className='leading-[18px] text-[15px] text-sky-600 underline'
                >Info on this page is wrong!</p>
              </a>
            </div>

          </div>

        </div>
      }
    </>
  )
}
