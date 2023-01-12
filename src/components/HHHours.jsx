import React from 'react'

// const dateConverter = require("../helperFunctions/dateConverter")
// const militaryTimeConverter = require("../helperFunctions/militaryTimeConverter")

import militaryTimeConverter from "../helperFunctions/militaryTimeConverter"
import dateConverter from "../helperFunctions/dateConverter"

export default function HHHours({ hour, timeOutputVal }) {
    // console.log(timeOutputVal)
    const dayOweek = dateConverter(hour.day, true)
    const displayStart1 = militaryTimeConverter(hour.start1,timeOutputVal)
    const displayStart2 = militaryTimeConverter(hour.start2,timeOutputVal)
    
    let displayEnd1 = null
    if (hour.end1close) {
        displayEnd1 = "Close"
    } else {
        displayEnd1 = militaryTimeConverter(hour.end1, timeOutputVal)
    }

    let displayEnd2 = null
    if (hour.end2close) {
        displayEnd2 = "Close"
    } else {
        displayEnd2 = militaryTimeConverter(hour.end2, timeOutputVal)
    }
    
    let renderHappyHour;
    if (hour.isAllDay){
        renderHappyHour = "All Day"
    } else {
        renderHappyHour = hour.hasHH1 ? `${displayStart1}-${displayEnd1}` : `N/A`
    }

    let renderLateNight;
    if (hour.isAllDay){
        renderLateNight = "All Day"
    } else {
        renderLateNight = hour.hasHH2 ? `${displayStart2}-${displayEnd2}` : `N/A`
    }
    
    const timePTagClass = 'text-[11px] justify-items-start'
    // console.log(hour)
    return (
        <div className='grid grid-cols-7 pl-3'>   
            <p
                className={`${timePTagClass} col-start-1 col-end-1 `}
            >{dayOweek}</p>

            <div className='flex mx-5 col-start-2 col-span-3'>
                
                <p
                    className={timePTagClass}
                >{renderHappyHour}</p>
            </div>
            
            <div className='flex mx-5 col-start-5 col-span-3'>
                <p
                className={timePTagClass}
                >{renderLateNight}</p>
            </div>
        </div>
    )
}
