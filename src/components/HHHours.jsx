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

    
    const timePTagClass = 'text-[11px] justify-self-center'
    // console.log(hour)
    return (
        <div
            className='grid grid-cols-7 border-b'
        >           
            <p
                className={`${timePTagClass} col-start-1 col-end-1`}
            >{dayOweek}</p>
            {
                hour.hasHH1 ?
                <div
                    className='flex mx-5 justify-self-center col-start-2 col-span-3'
                >
                    <p
                        className={timePTagClass}
                    >{`${displayStart1} - ${displayEnd1}`}</p>
                </div>
                :
                <div
                    className='flex mx-5 justify-self-center col-start-2 col-span-3'
                >
                    <p
                        className={timePTagClass}
                    ></p>
                </div>
            }

            {
                hour.hasHH2 ?
                <div
                className='flex mx-5 justify-self-center col-start-5 col-span-3'
                >
                    <p
                    className={timePTagClass}
                    >{`${displayStart2} - ${displayEnd2}`}</p>
                   
                </div>
                :
                <div
                    className='flex mx-5 justify-self-center col-start-5 col-span-3'
                >
                    <p
                    className={timePTagClass}
                    ></p>
                </div>
            }

        </div>
    )
}
