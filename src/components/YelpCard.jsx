import React from 'react'

export default function YelpCard({ business }) {
    // console.log("yelpcard business:", business)
    return (
            <>
            <div
            className='flex my-2 border rounded-xl'
            >
                <img
                // loading='lazy'
                className='w-[94px]'
                src={business.image_url}
                />
                <div>
                    <p>{business.name}</p>
                    <p>{business.location.address1}, {business.location.city}</p>
                </div>
            </div>
            </>

        )
}
