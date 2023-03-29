import React, { Suspense, lazy, useState } from 'react'
import { useEffect } from 'react'
import LoadingComp from './Shared/LoadingComp'
import RestListDetailCard from './RestListDetailCard'
// const RestListDetailCard = lazy(() => import('./RestListDetailCard'))

export default function ListViewComp({ restListErrorMsg,setRestIdxHover, showRestaurants,isFetchingRestData, searchParams }) {

  const listRestaurants = showRestaurants.map((restaurant, idx) => {
    return (
      // <Suspense fallback={<LoadingComp />}>
        <RestListDetailCard
          key={`restCard-${restaurant._id}`}
          restaurantInfo={restaurant}
          idx={idx}
          setRestIdxHover={setRestIdxHover}
        />
      // </Suspense>
    )
  })
  return (
    <>
      
        <div
          className='w-full md:w-[45vw] overflow-auto'
        >
          {
            isFetchingRestData && <LoadingComp />
          }
          {/* renders No restaurants message */}
          {!isFetchingRestData && restListErrorMsg.length > 0 && 
            <>
              <p>{restListErrorMsg}</p>
            </>
          }

            {/* renders restaurants if the array length is greater than 0 */}
          {!isFetchingRestData && restListErrorMsg.length == 0 && 
            <ul>
              {listRestaurants}
            </ul>
          }
        </div>
    </>
  )
}
