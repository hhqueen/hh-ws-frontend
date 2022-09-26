import React from 'react'

export default function RestListDetail({restaurantInfo}) {
  
    const cuisineString = restaurantInfo.cuisines.join(", ")
    return (
    // container div
    <li
    className='flex flex-col border my-5'
    >
        {/* image div */}
        <div>
            <img
            src={restaurantInfo.image_url}
            alt={restaurantInfo.name}
            />
        </div>

        {/* info div */}
        <div>
            <p>{restaurantInfo.name}</p>
            <p>{cuisineString}</p>
            <p>{restaurantInfo.city}</p>
        </div>

    </li>
  )
}
