import React from 'react'
import { useNavigate } from "react-router-dom"
import HHHours from './HHHours'
import MenuItems from './MenuItems'
import dateConverter from "../helperFunctions/dateConverter"
import showApplicableFilters from "../helperFunctions/showApplicableFilters"
// const dateConverter = require("../helperFunctions/dateConverter")


export default function RestListDetailCard({ dow, restaurantInfo }) {
    const navigate = useNavigate()

    const cuisineString = restaurantInfo.cuisines.join(", ")
    const applicableFilters = showApplicableFilters(restaurantInfo)
    
    const dowHours = restaurantInfo.hours.filter((day) => {
        const numOfDay = dateConverter(dow, false)
        // console.log("numOfDay", numOfDay)
        const dayFilterFlag = numOfDay === day.day
        return dayFilterFlag
    }).map((hour) => {
        return (
            <HHHours
                hour={hour}
            />
        )

    })

    return (
        // container div
        <div
            className='mb-3 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
            onClick={() => navigate(`/restaurant/${restaurantInfo._id}`)}
        >
            <img
                src={restaurantInfo.image_url}
                alt={restaurantInfo.name}
                className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            />

            {/* image and Info Container Div */}
            <div
                className='flex flex-col justify-between p-4 leading-normal'
            >

                {/* info div */}
                <p
                    className='font-semibold text-sm'
                >{restaurantInfo.name}</p>
                
                <p
                    className='text-xs my-1'
                >{applicableFilters}</p>

                <p
                    className='text-xs my-1'
                >{cuisineString}</p>
                <p
                    className='text-xs my-1'
                >{restaurantInfo.city}</p>
                {/* hours Div */}
                {dowHours}

            </div>

        </div>
    )
}
