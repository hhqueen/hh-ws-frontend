import React, { Suspense, lazy, useState } from 'react'
import { useEffect } from 'react'
import LoadingComp from './LoadingComp'
import RestListDetailCard from './RestListDetailCard'
// const RestListDetailCard = lazy(() => import('./RestListDetailCard'))

export default function ListViewComp({ restListErrorMsg,setRestIdxHover, coordinatesState, dow, showRestaurants,isFetchingRestData, searchParams }) {

  // console.log(showRestaurants)
  // const [errorMessage, setErrorMessage] = useState("")

  // const messageHandler = () =>{
  //   setErrorMessage("")
  //   if (!isFetchingRestData) {
  //     if (showRestaurants.length === 0 && searchParams.address.length > 0 && searchParams.searchTerm.length > 0 ) {
  //       setErrorMessage(`There are no restaurants that match your search! =(`)
  //       return
  //     }

      
  //     if( showRestaurants.length === 0 && searchParams.address.length === 0  ) {
  //       setErrorMessage(`Please enter a city or address!`)
  //       return
  //     }


  //     return ""
  //   }    
  // }

  // useEffect(()=>{
  //   messageHandler()
  // })

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
