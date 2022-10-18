import React from 'react'

// const dateConverter = require("../helperFunctions/dateConverter")
// const militaryTimeConverter = require("../helperFunctions/militaryTimeConverter")

import militaryTimeConverter from "../helperFunctions/militaryTimeConverter"
import dateConverter from "../helperFunctions/dateConverter"

export default function HHHours({ hour }) {

    const dayOweek = dateConverter(hour.day, true)
    const displayStart1 = militaryTimeConverter(hour.start1)
    const displayStart2 = militaryTimeConverter(hour.start2)
    
    let displayEnd1 = null
    if (hour.end1close) {
        displayEnd1 = "Close"
    } else {
        displayEnd1 = militaryTimeConverter(hour.end1)
    }

    let displayEnd2 = null
    if (hour.end2close) {
        displayEnd2 = "Close"
    } else {
        displayEnd2 = militaryTimeConverter(hour.end2)
    }

    
    const timePTagClass = 'text-xs justify-self-center'
    // console.log(hour)
    return (
        <div
            className='grid grid-cols-5 border'
        >           
            <p
            className={`${timePTagClass} col-start-1 col-end-1`}
            >{dayOweek}</p>
            {
                hour.hasHH1 ?
                <div
                className='flex mx-5 justify-self-center col-start-2 col-span-2'
                >
                    <p
                    className={timePTagClass}
                    >{`${displayStart1} - ${displayEnd1}`}</p>
                </div>
                :
                <div
                    className='flex mx-5 justify-self-center col-start-2 col-span-2'
                >
                    <p
                    className={timePTagClass}
                    >No Happy Hour :,(</p>
                </div>
            }

            {
                hour.hasHH2 &&
                <div
                className='flex mx-5 justify-self-center col-start-4 col-span-2'
                >
                    <p
                    className={timePTagClass}
                    >{`${displayStart2} - ${displayEnd2}`}</p>
                   
                </div>
            }

        </div>
    )
}
