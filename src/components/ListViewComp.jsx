import React from 'react'
import RestListDetail from './RestListDetail'

export default function ListViewComp({ dow, allRestaurants }) {

  // console.log(allRestaurants)

  const listRestaurants = allRestaurants.map((restaurant) => {
    return (
        <RestListDetail
          restaurantInfo={restaurant}
          dow={dow}
        />
    )
  })
  return (
    <>
      <div
        className='w-full'
      >
        <ul>
          {listRestaurants}
        </ul>
      </div>
    </>
  )
}