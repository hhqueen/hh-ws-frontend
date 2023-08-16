/* import libarires */

import React, { useMemo, useEffect, useState, useCallback, useContext } from 'react'
// import { GoogleMap, LoadScript, useLoadScript, MarkerF, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api'
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import { useMediaQuery } from 'react-responsive';
import LoadingComp from './Shared/LoadingComp';
import MarkerInfoBoxComp from './MarkerInfoBoxComp';
import { useImmer } from 'use-immer';

import { GlobalStateContext } from './context/GlobalStateContext';


const loadScriptObj = { googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY, version: "beta", libraries: ["marker"] }

export default function MapViewComp({
  setShowRestaurantsState,
  showRestaurants,
  coordinatesState,
  searchOnMapMoveProps
}) {

  /** variables*/
  const { isLoaded, loadError } = useLoadScript(loadScriptObj)
  const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })
  const center = useMemo(() => ({ lat: coordinatesState.latitude, lng: coordinatesState.longitude }), [coordinatesState])

  const [mouseDown, setMouseDown] = useState(false)
  const [mapObj, setMapObj] = useState(null)
  const [originalBound, setOriginalBound] = useImmer({})
  const [newBound, setNewBound] = useImmer({})
  const GlobalStateContextVar = useContext(GlobalStateContext)

  const {
    searchOnMapMove,
    setSearchOnMapMove,
    gmapBoxState,
    setGmapBoxState
  } = searchOnMapMoveProps

  let containerStyle = {
    sm: {
      width: `100vw`,
      height: `100%`
    },
    md: {
      width: `40vw`,
      height: `100%`
    },
  }

  /* functions */
  const onLoad = useCallback((map) => {
    setMapObj(map)
    // setOriginalBound(getMapBounds(map))
    // handleSetGmapBoxState({})
  }, []);

  function getMapBounds(mapObj) {
    // console.log("mapObj:",mapObj)
    return new window.google.maps.LatLngBounds(mapObj?.getBounds()).toJSON()
  }

  function getAndSetNewMapBound() {
    setNewBound(getMapBounds(mapObj))
  }

  function handleSetGmapBoxState (bound) {
    console.log("searchOnMapMove Bool:", searchOnMapMove)
    setGmapBoxState(bound)
    console.log("setGmapBoxState set to:", bound)
  }

  const mapMarkers = showRestaurants.map((rest, idx) => {
    const labelNum = idx + 1
    return (
      <>
        <MarkerInfoBoxComp
          labelNum={labelNum}
          idx={idx}
          restaurantData={rest}
          showRestaurants={showRestaurants}
          setShowRestaurantsState={setShowRestaurantsState}
        />
      </>
    )
  })


  useEffect(() => {
    if (loadError !== undefined)
      console.error("loadError:", loadError)
  }, [loadError])

  /* useEffects */
  // sets gmapBoxState (on app.js level) after timeout to prevent constant pinging of backend on map move
  useEffect(() => {
    const waitTime = 200 //milliseconds
    const timeOut = setTimeout(()=>{
      handleSetGmapBoxState(newBound)
    }, waitTime)
    return () => clearTimeout(timeOut)
  }, [searchOnMapMove, newBound])


  // render Comps
  if (!isLoaded
    // && (coordinatesState.latitude == 0 && coordinatesState.longitude == 0) 
    // && isFetchingRestData
  ) return <LoadingComp />
  console.log("GlobalStateContextVar.geoLocationPermission:",GlobalStateContextVar.geoLocationPermission)
  // if (GlobalStateContextVar.geoLocationPermission !== true ) return
  return (
    <>

      <div
        className='relative w-full h-full'
      >
        <GoogleMap
          id='mapRef'
          // ref={mapRef}
          // onResize={()=>{
          //   console.log("map resize")
          //   gmapGetBounds()
          // }}
          onMouseDown={() => setMouseDown(true)}
          onMouseUp={() => setMouseDown(false)}
          onBoundsChanged={() => {
            // console.log("map boundsChanged")
            getAndSetNewMapBound()
          }}
          onLoad={onLoad}
          zoom={13}
          mapContainerStyle={isTWmd ? containerStyle.md : containerStyle.sm}
          center={center}
          onClick={() => {
            // closes all info box upon clicking on map
            showRestaurants.forEach((rest, idx) => {
              if (rest.showInfoBox) {
                // console.log("idx:", idx)
                setShowRestaurantsState(draft => {
                  draft[idx].showInfoBox = false
                })
              }
            })

          }}
        >

          {/* <TransitLayer/> */}


          {/* Center Marker */}
          <MarkerF
            animation={"bounce"}
            icon={'https://res.cloudinary.com/hhqueen/image/upload/w_50,c_scale/v1675632375/website_assets/hhq-icon_tgc27d.png'}
            clickable={true}
            position={center}
          />

          {/* render Markers */}
          {mapMarkers}
          {/* </div>
        </OverlayView> */}
        </GoogleMap>
        <div
          className='absolute h-fit bottom-3 md:top-0 left-1/2 -translate-x-1/2'
        >
          <div
            className='bg-white w-fit px-3 py-1 text-center align-middle  rounded-lg'
          >
          <label
            className='flex items-center'
            htmlFor='searchOnMapMoveInput'

          >
            <input
              // className='text-center align-middle'
              id='searchOnMapMoveInput'
              type='checkbox'
              checked={searchOnMapMove}
              onClick={()=>{
                setSearchOnMapMove(prev => !prev)
              }}
            />
             <p
              className='pl-2 text-center align-middle text-sm'
             >Search On Map Move</p>
          </label>
          </div>
        </div>
      </div>
    </>
  )
}