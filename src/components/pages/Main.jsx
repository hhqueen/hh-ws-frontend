import { Suspense, lazy , useTransition } from 'react'
// import FilterComp from '../FilterComp'
// import ListViewComp from '../ListViewComp'
import MapViewComp from '../MapViewComp'
import LoadingComp from '../LoadingComp'
// import { Wrapper, Status } from "@googlemaps/react-wrapper";

const ListViewComp = lazy(() => import('../ListViewComp'))
const FilterComp = lazy(() => import('../FilterComp'))

export default function Main({ 
  UIFiltersProps, 
  searchParams,
  isFetchingRestData,
  dow, 
  setDow, 
  allRestaurants, 
  filterParams, 
  setFilterParams, 
  filterFormSubmitHandler,
  currentLocation
}) {
    return (
    <div
      className='flex flex-col my-auto
      sm:flex-row sm:my-10'
    >
      <Suspense fallback={<LoadingComp />}>
        <FilterComp
          setFilterParams={setFilterParams}
          filterParams={filterParams}
          filterFormSubmitHandler={filterFormSubmitHandler}
          setDow={setDow}
          dow={dow}
          UIFiltersProps={UIFiltersProps}
        />
      </Suspense>

      <Suspense fallback={<LoadingComp />}>
        <ListViewComp
          isFetchingRestData={isFetchingRestData}
          allRestaurants={allRestaurants}
          dow={dow}
          searchParams={searchParams}
        />
      </Suspense>
      

      <MapViewComp
      currentLocation={currentLocation}
      />

    </div>
  )
}
