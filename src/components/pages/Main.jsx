import React from 'react'
import FilterComp from '../FilterComp'
import ListViewComp from '../ListViewComp'
import MapViewComp from '../MapViewComp'

export default function Main({allRestaurants,filterParams, setFilterParams}) {
  return (
    <div
    className='flex'
    >
        <div>
            <FilterComp
            setFilterParams = {setFilterParams}
            filterParams={filterParams}
            />
        </div>
        <div>
            <ListViewComp
            allRestaurants = {allRestaurants}
            />
        </div>
        {/* <div>
            <MapViewComp/>
        </div> */}
    </div>
  )
}
