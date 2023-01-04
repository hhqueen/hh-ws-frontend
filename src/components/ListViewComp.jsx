import React, { Suspense, lazy } from 'react'
import LoadingComp from './LoadingComp'
import RestListDetailCard from './RestListDetailCard'
// const RestListDetailCard = lazy(() => import('./RestListDetailCard'))

export default function ListViewComp({ dow, allRestaurants,isFetchingRestData }) {

  // console.log(allRestaurants)

  const listRestaurants = allRestaurants.map((restaurant) => {
    return (
      // <Suspense fallback={<LoadingComp />}>
        <RestListDetailCard
          key={`restCard-${restaurant._id}`}
          restaurantInfo={restaurant}
          dow={dow}
        />
      // </Suspense>
    )
  })
  return (
    <>
      
        <div
          className='w-full mt-[20px] md:mt-[160px]'
        >
          {
            isFetchingRestData && <LoadingComp />
          }
          {/* renders No restaurants message */}
          {allRestaurants.length === 0 && !isFetchingRestData &&
          <>
            <p>There is No Restaurants, please suggest new ones here Or come back later</p>
          </>
          }

            {/* renders restaurants if the array length is greater than 0 */}
          {allRestaurants.length > 0 && !isFetchingRestData &&
            <ul>
              {listRestaurants}
            </ul>
          }
        </div>
    </>
  )
}
