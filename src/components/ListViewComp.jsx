import React, { Suspense, lazy } from 'react'
import LoadingComp from './LoadingComp'
// import RestListDetailCard from './RestListDetailCard'
const RestListDetailCard = lazy(() => import('./RestListDetailCard'))

export default function ListViewComp({ dow, allRestaurants }) {

  // console.log(allRestaurants)

  const listRestaurants = allRestaurants.map((restaurant) => {
    return (
      <Suspense fallback={<LoadingComp />}>
        <RestListDetailCard
          key={`restCard-${restaurant._id}`}
          restaurantInfo={restaurant}
          dow={dow}
        />
      </Suspense>
    )
  })
  return (
    <>
      
        <div
          className='w-full mt-[20px] md:mt-[160px]'
          >
        {allRestaurants.length === 0 && <LoadingComp />}
        {allRestaurants.length > 0 && 
          <ul>
            {listRestaurants}
          </ul>
        }
        </div>
    </>
  )
}
