import React from 'react'
import FilterComp from '../FilterComp'
import ListViewComp from '../ListViewComp'
import MapViewComp from '../MapViewComp'

export default function Main({dow, setDow, allRestaurants, filterParams, setFilterParams, filterFormSubmitHandler }) {
  return (
    <div
      className='flex'
    >
      <div>
        <FilterComp
          setFilterParams={setFilterParams}
          filterParams={filterParams}
          filterFormSubmitHandler={filterFormSubmitHandler}
          setDow={setDow}
          dow={dow}
        />
      </div>
      <div>
        <ListViewComp
          allRestaurants={allRestaurants}
          dow={dow}
        />
      </div>
      {/* <div>
            <MapViewComp/>
        </div> */}
    </div>
  )
}
