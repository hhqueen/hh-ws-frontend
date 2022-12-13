import React from 'react'
import { useNavigate } from "react-router-dom"
import HHHours from './HHHours'
import jwt_decode from 'jwt-decode'
import dateConverter from "../helperFunctions/dateConverter"
import showApplicableFilters from "../helperFunctions/showApplicableFilters"

import { Dropdown } from 'flowbite-react'
// const dateConverter = require("../helperFunctions/dateConverter")


export default function RestListDetailCard({ dow, restaurantInfo }) {
    const navigate = useNavigate()


    const cuisineString = restaurantInfo.cuisines.join(", ")
    const applicableFilters = showApplicableFilters(restaurantInfo.filterParams)

    const dowHours = restaurantInfo.hourSet.hours.filter((day) => {
        const numOfDay = dateConverter(dow, false)
        // console.log("numOfDay", numOfDay)
        const dayFilterFlag = numOfDay === day.day
        return dayFilterFlag
    }).map((hour, idx) => {
        return (
            <HHHours
                key={`restDetailCard-${restaurantInfo._id}-${idx}`}
                hour={hour}
                timeOutputVal={1}
            />
        )

    })

    return (
        // container div
        <div
            className='relative mb-3 h-[130px] w-auto flex flex-row items-center bg-white rounded-lg md:rounded-r-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
        >
            <img
                loading="lazy"
                onClick={() => navigate(`/restaurant/${restaurantInfo._id}`)}
                src={restaurantInfo.image_url}
                alt={restaurantInfo.name}
                className="hover:cursor-pointer hover:scale-[1.05] object-cover h-full w-3/12 rounded-l-lg md:h-full md:w-3/12 md:rounded-none md:rounded-l-lg"
            />

            {/* image and Info Container Div */}
            <div
                className='flex flex-col justify-between p-4 leading-normal'
            >

                {/* info div */}
                <p
                    className='font-semibold text-sm hover:underline hover:cursor-pointer'
                    onClick={() => navigate(`/restaurant/${restaurantInfo._id}`)}
                >{restaurantInfo.name}</p>

                <p
                    className='text-[11px]'
                >{applicableFilters}</p>

                <p
                    className='text-[11px]'
                >{cuisineString}</p>
                <p
                    className='text-[11px]'
                >{restaurantInfo.city}</p>
                {/* hours Div */}
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
                {/* Hour */}
                {dowHours}

            </div>
            {
                localStorage.getItem('jwt') && jwt_decode(localStorage.getItem('jwt')).auth === "Admin" &&
                <div
                    className="absolute top-0 right-0"
                >
                    <Dropdown
                        label="..."
                        size="sm"
                        arrowIcon={false}
                        color=""
                    >
                        <Dropdown.Item onClick={() => navigate(`/editrestaurant/${restaurantInfo._id}`)}>
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => {
                            // ARE YOU SURE MODAL -> API call to server to set rest as inActive
                        }}>
                            Delete
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            }

        </div>
    )
}
