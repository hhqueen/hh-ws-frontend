import { Suspense, lazy, useTransition, useState } from 'react'
// import FilterComp from '../FilterComp'
// import ListViewComp from '../ListViewComp'
import MapViewComp from '../../MapViewComp'
import MapViewJSLoaderExperimental from '../../MapViewJSLoaderExperimental'

import LoadingComp from '../../LoadingComp'
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
import './Main.css'
import { useMediaQuery } from 'react-responsive'
import { useImmer } from 'use-immer'

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
  mainDivStyle,
  coordinatesState,
  restIdxHover,
  setRestIdxHover,
  restListErrorMsg,
  focusedRestIdx,
  setShowRestaurantsState
}) {
  const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })

  const [mapCompRender, setMapCompRender] = useImmer({
    open: false,
    closedHeight: 0,
    openHeight: 100
  })

  return (
    <div
      style={{
        height: mainDivStyle.minHeight,
        marginTop: mainDivStyle.marginTop
      }}
      className='flex flex-col
      sm:flex-row
      '
    >
      {isTWmd &&
        <div
          className='md:order-last'
        >
          {/* <MapViewComp
            coordinatesState={coordinatesState}
            showRestaurants={showRestaurants}
            setShowRestaurantsState={setShowRestaurantsState}
          // restIdxHover={setRestIdxHover}
          /> */}
          <MapViewJSLoaderExperimental
            isFetchingRestData={isFetchingRestData}
            coordinatesState={coordinatesState}
            showRestaurants={showRestaurants}
          />
        </div>
      }
      {/* <section
        className='w-full min-h-[50px] flex justify-around items-center'
      >
        <div>
          map 
        </div>
        <div>
          carrot
        </div>
      </section> */}
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
  )
}
