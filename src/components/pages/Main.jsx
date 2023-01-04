import { Suspense, lazy } from 'react'
// import FilterComp from '../FilterComp'
// import ListViewComp from '../ListViewComp'
// import MapViewComp from '../MapViewComp'
import LoadingComp from '../LoadingComp'

const ListViewComp = lazy(() => import('../ListViewComp'))
const FilterComp = lazy(() => import('../FilterComp'))

export default function Main({ isFetchingRestData,dow, setDow, allRestaurants, filterParams, setFilterParams, filterFormSubmitHandler }) {


  return (
    <div
      className='flex flex-col 
      sm:flex-row sm:my-10'
    >
      <Suspense fallback={<LoadingComp />}>
        <FilterComp
          setFilterParams={setFilterParams}
          filterParams={filterParams}
          filterFormSubmitHandler={filterFormSubmitHandler}
          setDow={setDow}
          dow={dow}
        />
      </Suspense>

      <Suspense fallback={<LoadingComp />}>
        <ListViewComp
          isFetchingRestData={isFetchingRestData}
          allRestaurants={allRestaurants}
          dow={dow}
        />
      </Suspense>


    </div>
  )
}
