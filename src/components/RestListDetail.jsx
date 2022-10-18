import React from 'react'
import { useNavigate } from "react-router-dom"
import HHHours from './HHHours'
import MenuItems from './MenuItems'
import dateConverter from "../helperFunctions/dateConverter"
// const dateConverter = require("../helperFunctions/dateConverter")


export default function RestListDetail({ dow, restaurantInfo }) {
    const navigate = useNavigate()

    const cuisineString = restaurantInfo.cuisines.join(", ")

    const dowHours = restaurantInfo.hours.filter((day) => {
        const numOfDay = dateConverter(dow, false)
        console.log("numOfDay", numOfDay)
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
            className='flex flex-col border'
            onClick={() => navigate(`/restaurant/${restaurantInfo._id}`)}
        >
            
            {/* image and Info Container Div */}
            <div
            className='flex'
            >
                {/* image div */}
                <div
                className='w-6/12 h-[8rem]'
                >
                    <img
                        src={restaurantInfo.image_url}
                        alt={restaurantInfo.name}
                        className="object-contain h-full place-self-center"
                    />
                </div>

                {/* info div */}
                <div
                className='h-fit place-self-center'
                >
                    <p
                    className='text-sm'
                    >{restaurantInfo.name}</p>
                    <p
                    className='text-xs my-1'
                    >{cuisineString}</p>
                    <p
                    className='text-xs my-1'
                    >{restaurantInfo.city}</p>
                </div>
            </div>
            {/* hours Div */}
            {dowHours}

            
            
        </div>
    )
}
