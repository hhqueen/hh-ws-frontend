import React, { useEffect, useRef, useMemo, useState } from 'react'
// import { GoogleMap, LoadScript, useLoadScript, MarkerF, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api'
import { GoogleMap, useLoadScript, MarkerF, OverlayView, GoogleMapProps, TransitLayer } from '@react-google-maps/api'
import { useMediaQuery } from 'react-responsive';
import LoadingComp from './LoadingComp';
import MarkerInfoBoxComp from './MarkerInfoBoxComp';
import { useImmer } from 'use-immer';

const containerStyleTWmd = {
  width: `700px`,
  height: `100%`
}

const containerStyleTWsm = {
  width: `100%`,
  height: `300px`
}

export default function MapViewComp({ setShowRestaurantsState, showRestaurants, coordinatesState, restIdxHover,isFetchingRestData }) {
  const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })
  const center = useMemo(() => ({ lat: coordinatesState.latitude, lng: coordinatesState.longitude }), [coordinatesState])
  const [markerStateArr, setMarkerStateArr] = useImmer(new Array())
  const [infoBoxStateArr, setInfoBoxStateArr] = useImmer([])
  
  const mapMarkers = showRestaurants.map((rest, idx) => {
    const labelNum = idx + 1
    let showOpacity = 0.7
    let zIdx = idx
    if (idx === restIdxHover) {
      showOpacity = 1.0
      zIdx = showRestaurants.length + 1
    }
    return (
      <>
        <MarkerInfoBoxComp
          labelNum={labelNum}
          idx={idx}
          restaurantData={rest}
          markerOpacity={showOpacity}
          markerZidx={zIdx}
          showRestaurants={showRestaurants}
          setShowRestaurantsState={setShowRestaurantsState}
          setMarkerStateArr={setMarkerStateArr}
          markerStateArr={markerStateArr}
        />
      </>
    )
  })

  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY, version: "beta", libraries: ["marker"] })

  if (!isLoaded 
    // && (coordinatesState.latitude == 0 && coordinatesState.longitude == 0) 
    // && isFetchingRestData
  ) return <LoadingComp />
  return (
    <>
      <GoogleMap
        // ref={mapRef}
        zoom={13}
        mapContainerStyle={isTWmd ? containerStyleTWmd : containerStyleTWsm}
        // center={restIdxHover < 0 ? center : { lat: showRestaurants[restIdxHover].latitude, lng: showRestaurants[restIdxHover].longitude }}
        center={center}
        onClick={() => {
          console.log("map click")
          showRestaurants.forEach((rest, idx) => {
            if (rest.showInfoBox) {
              console.log("idx:", idx)
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
          onClick={() => { console.log("center clicked") }}
          position={center}

        />

        {/* render Markers */}
        {mapMarkers}
        {/* </div>
        </OverlayView> */}
      </GoogleMap>
    </>
  )
}