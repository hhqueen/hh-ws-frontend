import React, {Suspense} from 'react'
import FilterComp from '../FilterComp'
// import ListViewComp from '../ListViewComp'
import MapViewComp from '../MapViewComp'
import LoadingComp from '../LoadingComp'

import { Alert } from 'flowbite-react'

const ListViewComp = React.lazy(()=> import('../ListViewComp'))

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

        
        {/* <Suspense fallback={<LoadingComp/>}> */}
          <ListViewComp
            allRestaurants={allRestaurants}
            dow={dow}
          />
        {/* </Suspense>        */}
          
        
    </div>
  )
}
