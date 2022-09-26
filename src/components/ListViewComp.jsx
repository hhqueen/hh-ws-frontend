import React from 'react'
import RestListDetail from './RestListDetail'

export default function ListViewComp({ allRestaurants }) {

  console.log(allRestaurants)

  const listRestaurants = allRestaurants.map((restaurant) => {
    return (
      <RestListDetail
        restaurantInfo={restaurant}
      />
    )
  })
  return (
    <>
      <div
        className='w-[75vw]'
      >
        <h2>ListViewComp</h2>
        <div>
          {listRestaurants}
        </div>
      </div>
    </>
  )
}
