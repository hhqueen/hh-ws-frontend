import React from 'react'
import {useNavigate} from "react-router-dom"

const dateConverter = require("../helperFunctions/dateConverter")

export default function RestListDetail({dow, restaurantInfo}) {
    const navigate = useNavigate()
  
    const cuisineString = restaurantInfo.cuisines.join(", ")

    const dowHours = restaurantInfo.hours.filter((day)=>{
        const numOfDay = dateConverter(dow, false)
        console.log("numOfDay",numOfDay)
        const dayFilterFlag = numOfDay === day.day
        return dayFilterFlag
    }).map((hour)=>{
        const dayOfWeek = dateConverter(hour.day, true)
        return(
            <div
            className='flex'
            >
                <p>{dayOfWeek}</p>
                <p>{hour.start1}</p>
                <p>-</p>
                <p>{hour.end1}</p>
            </div>
        )
        
    })

    return (
    // container div
    <div
    className='flex flex-col border my-5'
    onClick={()=>navigate(`/restaurant/${restaurantInfo._id}`)}
    >
        
        {/* image div */}
        <div
        >
            <img
            src={restaurantInfo.image_url}
            alt={restaurantInfo.name}
            />
        </div>

        {/* info div */}
        <div>
            <p>{restaurantInfo.name}</p>
            <p>{cuisineString}</p>
            <p>{restaurantInfo.city}</p>
        </div>
        {dowHours}
    </div>
  )
}
