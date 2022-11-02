import React from 'react'

export default function HourInput({ handleHourInputChange, restaurantData, idx }) {
    return (
        <>
            <input
                id={`${day}Hour1Start`}
                className="min-w-[50px] text-xs"
                type="time"
                defaultValue="15:00"
                onChange={(e) => handleHourInputChange(e, idx)}
                disabled={!restaurantData.hours[idx].hasHH1}
            />

            <input
                id={`${day}Hour1end`}
                className="min-w-[50px] text-xs"
                name="end1"
                type="time"
                defaultValue="18:00"
                onChange={(e) => handleHourInputChange(e, idx)}
                disabled={!restaurantData.hours[idx].hasHH1}
            />
        </>
    )
}
