import React from 'react'
import militaryTimeConverter from "../../helperFunctions/militaryTimeConverter"
import dateConverter from "../../helperFunctions/dateConverter"

import HHHoursHeader from './HHHoursHeader'

export default function HHHoursContainer({ hour, timeOutputVal }) {
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
  return (
    <div
    className='static grid grid-cols-7 pl-3'
    >
      <HHHoursHeader/>
    </div>
  )
}
