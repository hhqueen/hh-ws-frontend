import React from 'react'
import { getDistance } from 'geolib'

export default function DistancePartialComp({
    currentLocation, restaurantLocation, pStyle
}) {
    const meterToMileConversionRate = 0.000621371
    
    const distanceMeter = getDistance(
        currentLocation, 
        restaurantLocation,
        1)
    const distanceMi = distanceMeter * meterToMileConversionRate

   return (
    <>
        <p  
            className={pStyle}
        >{`${distanceMi.toFixed(2)} mi`}</p>
    </>
  )
}
