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
        className='w-[75vw]'
      >
        <h2>ListViewComp</h2>
        <ul>
          {listRestaurants}
        </ul>
      </div>
    </>
  )
}
