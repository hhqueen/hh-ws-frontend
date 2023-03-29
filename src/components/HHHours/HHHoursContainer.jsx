import React from 'react'
import militaryTimeConverter from "../../helperFunctions/militaryTimeConverter"
import dateConverter from "../../helperFunctions/dateConverter"

import HHHoursHeader from './HHHoursHeader'
import HHHour from './HHHour'

export default function HHHoursContainer({ hourSet,timeOutputVal, dow = null }) {

    const colStyle = {
        col1: 'text-[11px] justify-items-start col-start-0 col-end-2',
        col2: `text-[11px] mx-1 col-start-2 col-end-5`,
        col3: `text-[11px] mx-1 col-start-5 col-end-8`
    }

    let renderHours = <></>
    let filteredHours = hourSet.hours
    if (dow !== null) {
        filteredHours = filteredHours.filter(i => { return dateConverter(dow,false) === i.day })
    }
    renderHours = filteredHours?.map((hour) => {
        const dayOfweek = dateConverter(hour.day, true)
        const displayStart1 = militaryTimeConverter(hour.start1, timeOutputVal)
        let displayEnd1 = null
        if (hour.end1close) {
            displayEnd1 = "Close"
        } else {
            displayEnd1 = militaryTimeConverter(hour.end1, timeOutputVal)
        }


        const displayStart2 = militaryTimeConverter(hour.start2, timeOutputVal)
        let displayEnd2 = null
        if (hour.end2close) {
            displayEnd2 = "Close"
        } else {
            displayEnd2 = militaryTimeConverter(hour.end2, timeOutputVal)
        }

        let renderHappyHour;
        if (hour.isAllDay) {
            renderHappyHour = "All Day"
        } else {
            renderHappyHour = hour.hasHH1 ? `${displayStart1}-${displayEnd1}` : `N/A`
        }

        let renderLateNight;
        if (hour.isAllDay) {
            renderLateNight = "All Day"
        } else {
            renderLateNight = hour.hasHH2 ? `${displayStart2}-${displayEnd2}` : `N/A`
        }
        return (
            <>
                <HHHour
                    colStyle={colStyle}
                    dayOfWeek={dayOfweek}
                    happyHour={renderHappyHour}
                    lateNight={renderLateNight}
                />
            </>
        )

    })
    return (
        <div
            className='static grid grid-cols-7 justify-items-center'
        >
            <HHHoursHeader
                colStyle={colStyle}
            />
            {renderHours}
        </div>
    )
}
