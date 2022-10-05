import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { checkboxFilters } from "../../sourceData/filters"
import axios from "axios"

const dateConverter = require("../../helperFunctions/dateConverter")

export default function RestDetail() {
  let { id } = useParams()
  const [restData, setRestData] = useState({})
  const [cuisineString, setCuisineString] = useState("")
  const [filterString, setFilterString] = useState("")
  const [restHours, setRestHours] = useState([])
  // const [isLoaded, setIsloaded] = useState(false)
  useEffect(() => {
    const getRestData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants/${id}`)
      console.log(response.data)
      setRestData(response.data)
      console.log("rest hours?",response.data.hours)
      setRestHours(response.data.hours)
      setCuisineString(response.data.cuisines.join(", "))
      showApplicableFilters(response.data)
      // setIsloaded(true)
    }
    getRestData()
  }, [id])

  const showApplicableFilters = (restData) => {
    let applFilterArr = []
    checkboxFilters.forEach((filter) => {
      if (restData[filter.name]) {
        applFilterArr.push(filter.display)
      }
    })
    let filterString = applFilterArr.join(", ")
    // console.log("filterString:",filterString)
    setFilterString(filterString)
  }

  const mapHours = restHours.map((time) => {
    // console.log(time)
    console.log(time)
    const dayOweek = dateConverter(time.day, true)
    return (
      <div
        className='flex'
      >
        <p>Day: </p><p>{dayOweek}</p>
        <p>Start Time: </p><p>{time.start1}</p>
        <p>End Time: </p><p>{time.end1}</p>
      </div>
    )
  })

  return (
    <div>
      <img src={restData.image_url} alt={restData.name} />
      <p>{restData.name}</p>
      <p>{cuisineString}</p>
      <p>{filterString}</p>
      <p>{`${restData.address1} ${restData.city} ${restData.state} ${restData.zip_code}`}</p>
      <a href={`tel:${restData.telNumber}`}>{restData.displayNumber}</a>

      {mapHours}
    </div>
  )
}
