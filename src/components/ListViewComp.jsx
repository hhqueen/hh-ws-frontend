import React, {Suspense} from 'react'
import LoadingComp from './LoadingComp'
import RestListDetailCard from './RestListDetailCard'
// const RestListDetailCard = React.lazy(()=>{import('./RestListDetailCard')})

export default function ListViewComp({ dow, allRestaurants }) {

  // console.log(allRestaurants)

  const listRestaurants = allRestaurants.map((restaurant) => {
    return (
        <RestListDetailCard
          key={`restCard-${restaurant._id}`}
          restaurantInfo={restaurant}
          dow={dow}
        />
    )
  })
  return (
    <>
    <Suspense fallback={<LoadingComp/>}>
      <div
        className='w-full mt-[10px] md:mt-[60px]'
      >
        <ul>
          {listRestaurants}
        </ul>
      </div>
    </Suspense>
    </>
  )
}
