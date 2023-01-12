// libraries
import React from 'react'
import { useNavigate } from "react-router-dom"

// components
import DistancePartialComp from './DistancePartialComp'
import HHHours from './HHHours'
// function/data imports
import dateConverter from "../helperFunctions/dateConverter"
import showApplicableFilters from "../helperFunctions/showApplicableFilters"
import EditDeleteRestComp from './EditDeleteRestComp'

export default function RestListDetailCard({ dow, restaurantInfo, searchParams }) {
    const navigate = useNavigate()

    const currentLocation = {
        latitude: searchParams.currentLatitude,
        longitude: searchParams.currentLongitude
    }
    const restaurantLocation = {
        latitude: restaurantInfo.latitude,
        longitude: restaurantInfo.longitude
    }

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
            className=' mb-3 h-[130px] w-auto flex flex-row items-center bg-white rounded-lg md:rounded-r-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'

        >
            <img
            onClick={() => navigate(`/restaurant/${restaurantInfo._id}`)}
                loading="lazy"
                src={restaurantInfo.image_url}
                alt={restaurantInfo.name}
                className="hover:cursor-pointer hover:scale-[1.05] object-cover h-full min-w-[25%] w-3/12 rounded-l-lg md:rounded-none md:rounded-l-lg"
            />

            {/* image and Info Container Div */}
            <div
                className='relative'
                
            >
                <div
                    className=' flex flex-col justify-between p-4 leading-normal'
                    onClick={() => navigate(`/restaurant/${restaurantInfo._id}`)}
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
                    <div
                    className='flex'
                    >
                        <p
                            className='text-[11px]'
                        >{`${restaurantInfo.city} `}</p>
                        <DistancePartialComp
                            currentLocation={currentLocation}
                            restaurantLocation={restaurantLocation}
                            pStyle={'text-[11px] pl-2'}
                        />
                    </div>
                    {/* hours Div */}
                    {/* Hour Header */}
                    <div
                        className='static grid grid-cols-7 pl-3'
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

                <EditDeleteRestComp
                    id={restaurantInfo._id}
                />
            </div>

        </div>
    )
}
