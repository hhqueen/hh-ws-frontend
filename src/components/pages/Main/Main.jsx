import { Suspense, lazy, useTransition } from 'react'
// import FilterComp from '../FilterComp'
// import ListViewComp from '../ListViewComp'
import MapViewComp from '../../MapViewComp'
import LoadingComp from '../../LoadingComp'
// import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Accordion } from 'flowbite-react'
import './Main.css'
import { useMediaQuery } from 'react-responsive'

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
  restListErrorMsg
}) {
  const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })
  return (
    <div
      style={{
        height: mainDivStyle.minHeight,
        marginTop: mainDivStyle.marginTop
      }}
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
          setRestIdxHover={setRestIdxHover}
          restListErrorMsg={restListErrorMsg}
        />
      </Suspense>


      {!isTWmd && 
      <Accordion
        flush={true}
        alwaysOpen={true}
        className="max-h-[10px]"
      >
        <Accordion.Panel
        // alwaysOpen={false}
        >
          <Accordion.Title
            className='max-h-[10px]'
          >
            Map
          </Accordion.Title>
          <Accordion.Content>
            <MapViewComp
              coordinatesState={coordinatesState}
              showRestaurants={showRestaurants}
              restIdxHover={restIdxHover}
            />
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
      }
      {isTWmd &&
        <MapViewComp
          coordinatesState={coordinatesState}
          showRestaurants={showRestaurants}
          restIdxHover={restIdxHover}
        />
      }
      <div
      // style={{
      //   width: `700px`,
      //   height: `100%`
      // }}
      // className='w-full h-full'
      >

      </div>


    </div>
  )
}
