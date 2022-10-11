import React from 'react'
import { useNavigate } from "react-router-dom"
import HHHours from './HHHours'
import MenuItems from './MenuItems'

const dateConverter = require("../helperFunctions/dateConverter")

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
            className='flex flex-col border my-5'
            onClick={() => navigate(`/restaurant/${restaurantInfo._id}`)}
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

            <div
            className='flex my-5'
            >
                <div
                className='basis-full my-3 items-center'
                >
                    <MenuItems
                        ItemsArr={restaurantInfo.menu.foodMenu}
                        menuType="Food"
                    />
                </div>
                <div
                className='basis-full my-3 place-self-auto'
                >
                    <MenuItems
                        ItemsArr={restaurantInfo.menu.drinkMenu}
                        menuType="Drink"
                    />
                </div>
            </div>
        </div>
    )
}
