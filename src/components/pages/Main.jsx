import React from 'react'
import FilterComp from '../FilterComp'
import ListViewComp from '../ListViewComp'
import MapViewComp from '../MapViewComp'

export default function Main({dow, setDow, allRestaurants, filterParams, setFilterParams, filterFormSubmitHandler }) {
  return (
    <div
      className='flex flex-col 
      sm:flex-row sm:my-10'
    >

        <FilterComp
          setFilterParams={setFilterParams}
          filterParams={filterParams}
          filterFormSubmitHandler={filterFormSubmitHandler}
          setDow={setDow}
          dow={dow}
        />

        <ListViewComp
          allRestaurants={allRestaurants}
          dow={dow}
        />

      {/* <div>
            <MapViewComp/>
        </div> */}
    </div>
  )
}
