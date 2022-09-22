import React from 'react'
import FilterComp from '../FilterComp'
import ListViewComp from '../ListViewComp'
import MapViewComp from '../MapViewComp'

export default function Main() {
  return (
    <div
    className='flex'
    >
        <div>
            <FilterComp/>
        </div>
        <div>
            <ListViewComp/>
        </div>
        {/* <div>
            <MapViewComp/>
        </div> */}

    </div>
  )
}
