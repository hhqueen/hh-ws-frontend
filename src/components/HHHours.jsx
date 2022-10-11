import React from 'react'

const dateConverter = require("../helperFunctions/dateConverter")

export default function HHHours({ hour }) {

    const dayOweek = dateConverter(hour.day, true)

    return (
        <div
            className='flex'
        >
            <p>{dayOweek}</p>
            <div
                className='flex mx-5'
            >
                <p>{hour.start1}</p>
                <p>-</p>
                <p>{hour.end1close ? "close" : hour.end1}</p>
            </div>
            <div
                className='flex mx-5'
            >
                <p>{hour.start2}</p>
                <p>-</p>
                <p>{hour.end2close ? "close" : hour.end1}</p>
            </div>
        </div>
    )
}
