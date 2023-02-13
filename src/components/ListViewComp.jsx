import React, { Suspense, lazy, useState } from 'react'
import { useEffect } from 'react'
import LoadingComp from './LoadingComp'
import RestListDetailCard from './RestListDetailCard'
// const RestListDetailCard = lazy(() => import('./RestListDetailCard'))

export default function ListViewComp({ setRestIdxHover, coordinatesState, dow, showRestaurants,isFetchingRestData, searchParams }) {

  // console.log(showRestaurants)
  const [errorMessage, setErrorMessage] = useState("")

  const messageHandler = () =>{
    setErrorMessage("")
    if (!isFetchingRestData) {
      if (showRestaurants.length === 0 && searchParams.address.length > 0 && searchParams.searchTerm.length > 0 ) {
        setErrorMessage(`There are no restaurants that match your search! =(`)
        return
      }

      
      if( showRestaurants.length === 0 && searchParams.address.length === 0  ) {
        setErrorMessage(`Please enter a city or address!`)
        return
      }


      return ""
    }    
  }

  useEffect(()=>{
    messageHandler()
  })

  const listRestaurants = showRestaurants.map((restaurant, idx) => {
    return (
      // <Suspense fallback={<LoadingComp />}>
        <RestListDetailCard
          key={`restCard-${restaurant._id}`}
          restaurantInfo={restaurant}
          searchParams={searchParams}
          coordinatesState={coordinatesState}
          dow={dow}
          idx={idx}
          setRestIdxHover={setRestIdxHover}
        />
      // </Suspense>
    )
  })
  return (
    <>
      
        <div
          className='w-full md:w-[45vw] mt-[20px] overflow-auto'
        >
          {
            isFetchingRestData && <LoadingComp />
          }
          {/* renders No restaurants message */}
          {errorMessage.length > 0 && !isFetchingRestData &&
            <>
              <p>{errorMessage}</p>
            </>
          }

            {/* renders restaurants if the array length is greater than 0 */}
          {showRestaurants.length > 0 && !isFetchingRestData &&
            <ul>
              {listRestaurants}
            </ul>
          }
        </div>
    </>
  )
}
