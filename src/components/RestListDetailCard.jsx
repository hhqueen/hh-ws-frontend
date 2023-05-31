// libraries
import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"

// components
import DistancePartialComp from './DistancePartialComp'
// import HHHours from './HHHours/HHHours'
import HHHoursContainer from './Shared/HHHours/HHHoursContainer'
import showApplicableFilters from "../helperFunctions/showApplicableFilters"
import EditDeleteRestComp from './EditDeleteRestComp'

// function/data imports
import apiLogger from '../helperFunctions/apiLogger'

// context
import { GlobalStateContext } from './context/GlobalStateContext'

// requires:
const {dc_StrToNum} = require("../helperFunctions/dowConv")

export default function RestListDetailCard({ setRestIdxHover, idx, restaurantInfo }) {
    const navigate = useNavigate()
    const componentName = 'RestListDetailCard'
    const cuisineString = restaurantInfo.cuisines.join(", ")
    const applicableFilters = showApplicableFilters(restaurantInfo.filterParams)
    const globalStateContextVal = useContext(GlobalStateContext)
    // console.log("globalState_restdetail",globalStateContextVal)


    const dowHours = restaurantInfo.hourSet.hours.filter((day) => {
        const numOfDay = dc_StrToNum(globalStateContextVal.dow)
        // console.log("numOfDay", numOfDay)
        const dayFilterFlag = numOfDay === day.day
        return dayFilterFlag
    }).map((hour, idx) => {
        return (
            <HHHoursContainer
                key={`restDetailCard-${restaurantInfo._id}-${idx}`}
                timeOutputVal={1}
            />
        )
    })
    const handleRestaurantClick = async (e) => {
        await apiLogger(e, componentName)
        navigate(`/restaurant/${restaurantInfo._id}`)
    }

    return (
        // container div
        <div
            className='
            my-1 h-[170px] min-h-[170px] py-3 flex flex-row items-center bg-white border shadow-md overflow-hidden
            md:flex-row md:w-[550px] md:max-w-xl md:rounded-r-lg
            hover:bg-gray-100 
            dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'
        // onMouseEnter={()=>{
        //     console.log(`mouse-enter: restIdx ${idx}`)
        //     setRestIdxHover(idx)
        // }}
        // onMouseLeave={()=>{
        //     console.log(`mouse-leave: restIdx -1`)
        //     setRestIdxHover(-1)
        // }}

        >
            <div>
                <p
                    className='w-10 px-2 h-full text-center'
                >{idx + 1}</p>
            </div>
            <img
                id={`RestListDetailCard_img_${restaurantInfo._id}`}
                name={`RestListDetailCard_img_${restaurantInfo._id}`}
                onClick={handleRestaurantClick}
                loading="lazy"
                src={restaurantInfo.image_url}
                alt={restaurantInfo.name}
                className="hover:cursor-pointer hover:scale-[1.05] object-cover h-full w-3/12 md:rounded-none"
            />

            {/* image and Info Container Div */}
            <div
                className='relative'

            >
                <div
                    className=' flex flex-col justify-between px-4 leading-normal'
                    id={`RestListDetailCard_div_${restaurantInfo._id}`}
                    name={`RestListDetailCard_div_${restaurantInfo._id}`}
                    onClick={handleRestaurantClick}
                >

                    {/* info div */}
                    <p
                        className='font-semibold text-sm hover:underline hover:cursor-pointer'
                        id={`RestListDetailCard_p_${restaurantInfo._id}`}
                        name={`RestListDetailCard_p_${restaurantInfo._id}`}
                        onClick={handleRestaurantClick}
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
                            currentLocation={globalStateContextVal.coordinatesState}
                            restaurantLocation={{
                                latitude: restaurantInfo.latitude,
                                longitude: restaurantInfo.longitude
                            }}
                            pStyle={'text-[11px] pl-2'}
                        />
                    </div>
                    {/* hours Div */}
                    {/* Hour Header */}
                    {
                        globalStateContextVal.dow &&
                        <>
                            {/* Hour */}
                            <HHHoursContainer
                                hourSet={restaurantInfo.hourSet}
                                timeOutputVal={1}
                                dow={globalStateContextVal.dow}
                            />
                        </>
                    }


                </div>

                <EditDeleteRestComp
                    id={restaurantInfo._id}
                />
            </div>

        </div>
    )
}
