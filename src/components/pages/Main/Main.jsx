import { Suspense, lazy, useTransition, useState } from 'react'
// import FilterComp from '../FilterComp'
// import ListViewComp from '../ListViewComp'
import MapViewComp from '../../MapViewComp'
// import MapViewJSLoaderExperimental from '../../Archived/MapViewJSLoaderExperimental'
// import MapGMapWrapper from '../../MapGMapWrapper'

import LoadingComp from '../../Shared/LoadingComp'
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
import './Main.css'
import { useMediaQuery } from 'react-responsive'
import { useImmer } from 'use-immer'

const ListViewComp = lazy(() => import('../../ListViewComp'))
const FilterComp = lazy(() => import('./partials/FilterComp'))

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
  mainDivStyle,
  coordinatesState,
  restListErrorMsg,
  setShowRestaurantsState,
  isTWmd,
  showMap,
  contentHeight
}) {

  const [mapCompRender, setMapCompRender] = useImmer({
    open: false,
    closedHeight: 0,
    openHeight: 100
  })
  console.log("contentHeight:", contentHeight)

  const MapViewCompVar = (
    <MapViewComp
      coordinatesState={coordinatesState}
      showRestaurants={showRestaurants}
      setShowRestaurantsState={setShowRestaurantsState}
      isFetchingRestData={isFetchingRestData}
      contentHeight={contentHeight}
    // restIdxHover={setRestIdxHover}
    />
  )
  return (
    <div
      style={{
        height: mainDivStyle.minHeight,
        marginTop: mainDivStyle.marginTop
      }}
      className='flex justify-center'
    >


      <div
        className='md:order-last'
      >
        {isTWmd ?
          MapViewCompVar
          :
          <>
            {showMap && MapViewCompVar}
          </>

        }
      </div>


      {
        !showMap &&

        <div
          className='flex flex-col w-fit md:w-[560px]'
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
              // setRestIdxHover={setRestIdxHover}
              restListErrorMsg={restListErrorMsg}
            />
          </Suspense>
        </div>
      }





    </div>
  )
}
