import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
// import { checkboxFilters } from "../../sourceData/filters"
import showApplicableFilters from "../../helperFunctions/showApplicableFilters"

import axios from "axios"

import HHHours from '../HHHours'
import MenuItems from '../MenuItems'

import LoadingComp from '../LoadingComp'

// const dateConverter = require("../../helperFunctions/dateConverter")

// NOTE TO SELF: add restaurant website URL to code

export default function RestDetail() {
  let { id } = useParams()
  const [restData, setRestData] = useState({})
  const [cuisineString, setCuisineString] = useState("")
  const [filterString, setFilterString] = useState("")
  const [restHours, setRestHours] = useState([])
  const [isLoaded, setIsloaded] = useState(false)
  useEffect(() => {
    const getRestData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants/${id}`)
      console.log("async data", response.data)

      const setRestDataFunc = (function () {
        setRestData(response.data)
        setIsloaded(true)
      })()

      // console.log("rest hours?", response.data.hours)
      setRestHours(response.data.hours)
      setCuisineString(response.data.cuisines.join(", "))
      
      setFilterString(
        showApplicableFilters(response.data)
      )
      
      // setIsloaded(true)
    }
    getRestData()
  }, [id])

  // const showApplicableFilters = (restData) => {
  //   let applFilterArr = []
  //   checkboxFilters.forEach((filter) => {
  //     if (restData[filter.name]) {
  //       applFilterArr.push(filter.display)
  //     }
  //   })
  //   let filterString = applFilterArr.join(", ")
  //   // console.log("filterString:",filterString)
  //   // setFilterString(filterString)
  //   return filterString
  // }

  const mapHours = restHours.map((hour) => {
    return (
      <HHHours
        hour={hour}
      />
    )
  })

  return (
    <div
    >
      <img src={restData.image_url} alt={restData.name} />
      <div
      className='py-3'
      >
      <p>{restData.name}</p>
      <p>{cuisineString}</p>
      <p>{filterString}</p>
      <p>{`${restData.address1} ${restData.city} ${restData.state} ${restData.zip_code}`}</p>
      <a href={`tel:${restData.telNumber}`}>{restData.displayNumber}</a>
      </div>
      
      <div
      className='py-3'
      >
      {mapHours}
      </div>

      {isLoaded ?
        <>
          <div
          >
            <div
            className='flex flex-col items-center justify-center py-3'>
              <p
              className='border-b'
              >Food Menu</p>
              <p
              className='px-10 text-center'
              >{restData.menu.foodSpecialsDescription}</p>
            <MenuItems
              ItemsArr={restData.menu.foodMenu}
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
            >{restData.menu.drinkSpecialsDescription}</p>
            <MenuItems
              ItemsArr={restData.menu.drinkMenu}
              menuType="Drink"
            />
            </div>
          </div>
        </>
        :
        <LoadingComp/>
      }
    </div>
  )
}
