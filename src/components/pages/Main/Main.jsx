import { Suspense, lazy, useTransition } from 'react'
// import FilterComp from '../FilterComp'
// import ListViewComp from '../ListViewComp'
import MapViewComp from '../../MapViewComp'
import LoadingComp from '../../LoadingComp'
// import { Wrapper, Status } from "@googlemaps/react-wrapper";

import './Main.css'

const ListViewComp = lazy(() => import('../../ListViewComp'))
const FilterComp = lazy(() => import('../../FilterComp'))

export default function Main({
  UIFiltersProps,
  searchParams,
  isFetchingRestData,
  dow,
  setDow,
  showRestaurants,
  filterParams,
  setFilterParams,
  filterFormSubmitHandler,
  currentLocation,
  mainDivStyle,
  coordinatesState
}) {
  return (
    <div
      style={mainDivStyle}
      className='flex flex-col
      sm:flex-row'
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
          showRestaurants={showRestaurants}
          dow={dow}
          searchParams={searchParams}
          coordinatesState={coordinatesState}
        />
      </Suspense>

      {/* <div
        style={{
          width: `700px`,
          height: `100%`
        }}
      >
        <MapViewComp
        coordinatesState={coordinatesState}
        showRestaurants={showRestaurants}
      />
      </div> */}


    </div>
  )
}
