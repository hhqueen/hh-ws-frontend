import React, { Suspense, lazy, useState } from 'react'
import { useEffect } from 'react'
import LoadingComp from './LoadingComp'
import RestListDetailCard from './RestListDetailCard'
// const RestListDetailCard = lazy(() => import('./RestListDetailCard'))

export default function ListViewComp({ dow, allRestaurants,isFetchingRestData, searchParams }) {

  // console.log(allRestaurants)
  const [errorMessage, setErrorMessage] = useState("")

  const messageHandler = () =>{
    setErrorMessage("")
    if (!isFetchingRestData) {
      if (allRestaurants.length === 0 && searchParams.address.length > 0 && searchParams.searchTerm.length > 0 ) {
        setErrorMessage(`There are no restaurants that match your search! =(`)
        return
      }

      
      if( allRestaurants.length === 0 && searchParams.address.length === 0  ) {
        setErrorMessage(`Please enter a city or address!`)
        return
      }

      // if( allRestaurants.length === 0 && searchParams.address.length === 0 AND GEOLOCATION FALSE ) {
      //   setErrorMessage(`CURRENT LOCATION ERROR MESSAGE!`)
      //   return
      // }


      return ""
    }    
  }

  useEffect(()=>{
    messageHandler()
  })

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
          {errorMessage.length > 0 && !isFetchingRestData &&
          <>
            <p>{errorMessage}</p>
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
