import React, { useState, useEffect, useMemo } from 'react'
// import { GoogleMap, LoadScript, useLoadScript, MarkerF, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api'
import { GoogleMap, useLoadScript, Marker, MarkerF, InfoBox } from '@react-google-maps/api'
import { useMediaQuery } from 'react-responsive';
import LogoSmall from './Logo/LogoSmall';
import LoadingComp from './LoadingComp';
import { useImmer } from 'use-immer';
import MarkerInfoBoxComp from './MarkerInfoBoxComp';

const containerStyleTWmd = {
  width: `700px`,
  height: `100%`
}

const containerStyleTWsm = {
  width: `100%`,
  height: `300px`
}

export default function MapViewComp({ showRestaurants, coordinatesState, restIdxHover }) {
  const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })
  const center = useMemo(() => ({ lat: coordinatesState.latitude, lng: coordinatesState.longitude }))
  const [centerState, setCenterState] = useImmer({
    lat: coordinatesState.latitude,
    lng: coordinatesState.longitude
  })
  // useEffect(()=>{
  //   setCenterState((draft)=>{
  //     draft.lat = showRestaurants[restIdxHover].latitude
  //     draft.lng = showRestaurants[restIdxHover].longitude
  //   })
  // },[restIdxHover])

  const [markerIdxHover, setMarkerIdxHover] = useState(-1)

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
        {/* <Marker
          key={`gMarker${rest._id}`}
          animation={"bounce"}
          clickable={true}
          onClick={() => { console.log(`${rest.name} clicked`) }}
          label={`${labelNum}`}
          position={{ lat: rest.latitude, lng: rest.longitude }}
          opacity={showOpacity}
          zIndex={zIdx}
        /> */}
        <MarkerInfoBoxComp
          labelNum={labelNum}
          idx={idx}
          restaurantData={rest}
          markerOpacity={showOpacity}
          markerZidx={zIdx}
        />
      </>
    )
  })

  // video example below:
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY })


  if (!isLoaded) return <LoadingComp />
  return (
    <>
      <GoogleMap
        zoom={13}
        mapContainerStyle={isTWmd ? containerStyleTWmd : containerStyleTWsm}
        center={restIdxHover < 0 ? center : { lat: showRestaurants[restIdxHover].latitude, lng: showRestaurants[restIdxHover].longitude }}
      // center={center}
      // center={centerState}
      >
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
      </GoogleMap>
    </>
  )
}