import { useState, useEffect, Suspense } from 'react'
import { useParams } from "react-router-dom"
import showApplicableFilters from "../../helperFunctions/showApplicableFilters"

import axios from "axios"

//Components
import HHHours from '../HHHours'
import MenuItems from '../MenuItems'
import LoadingComp from '../LoadingComp'

export default function RestDetail() {
  let { id } = useParams()
  const [restData, setRestData] = useState({
    hours: [],
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
  },[id])

  const mapHours = restData.hours.map((hour, idx) => {
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
    {
      isLoaded ?
    
      <div>
        < img src={restData?.image_url} alt={restData?.name} />
        <div
          className='py-3'
        >
          <p>{restData?.name}</p>
          <p>{restData?.cuisines.join(", ")}</p>
          <p>{showApplicableFilters(restData)}</p>

          <a 
            href={`https://www.google.com/maps/place/${address.replace(" ","+")}`} 
            target="_blank" 
            rel="noopener noreferrer">
            <p>{address}</p>
          </a>
          <a href={`tel:${restData?.telNumber}`}>{restData.displayNumber}</a>
        </div>

        <div
          className='py-3'
        >
          {mapHours}
        </div>

        <div
        >
          <div
            className='flex flex-col items-center justify-center py-3'>
            <p
              className='border-b'
            >Food Menu</p>
            <p
              className='px-10 text-center'
            >{restData?.menu.foodSpecialsDescription}</p>
            <MenuItems
              ItemsArr={restData?.menu.foodMenu}
              menuType="Food"
            />
          </div>

          <div
            className='flex flex-col items-center justify-center py-3'
          >
            <p
              className='border-b'
            >Drink Menu</p>
            <p
              className='px-10 text-center'
            >{restData?.menu.drinkSpecialsDescription}</p>
            <MenuItems
              ItemsArr={restData?.menu.drinkMenu}
              menuType="Drink"
            />
          </div>
        </div>
      </div>

      :

      <LoadingComp/>
      }
    </>
  )
}
