import React, { useEffect, useRef, useMemo, useState } from 'react'
// import { GoogleMap, LoadScript, useLoadScript, MarkerF, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api'
import { GoogleMap, useLoadScript, MarkerF, OverlayView, GoogleMapProps } from '@react-google-maps/api'
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

export default function MapViewComp({ setShowRestaurantsState,showRestaurants, coordinatesState, restIdxHover }) {
  const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })
  const center = useMemo(() => ({ lat: coordinatesState.latitude, lng: coordinatesState.longitude }))
  const [mapState, setMapState] = useState(null)


  // const [infoBoxOpenArr, setInfoBoxOpenArr] = useImmer([])
  // const [ibLoaded, setIbLoaded] = useState(false)
  
  // useEffect(() => {
  //   setIbLoaded(false)
  //   let ib_arr = []
  //   showRestaurants.forEach((rest, index) => {
  //     ib_arr.push({ isOpen: false })
  //   });
  //   setInfoBoxOpenArr(ib_arr)

  // }, [])
  // console.log("restIdxHover:", restIdxHover)
  // const map = new google.maps.Map(document.getElementById("map"),
  //   {
  //     zoom: 4,
  //     center: center,
  //   })
  // const [centerState, setCenterState] = useImmer({
  //   lat: coordinatesState.latitude,
  //   lng: coordinatesState.longitude
  // })
  // useEffect(()=>{
  //   setCenterState((draft)=>{
  //     draft.lat = showRestaurants[restIdxHover].latitude
  //     draft.lng = showRestaurants[restIdxHover].longitude
  //   })
  // },[restIdxHover])

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
          // infoBoxOpenArr={infoBoxOpenArr}
          // setInfoBoxOpenArr={setInfoBoxOpenArr}
        />
      </>
    )
  })

  useEffect(()=>{
    if (mapState !== null) {
      console.log("mapState:", mapState)
      mapState.panTo({lat: coordinatesState.latitude, lng: coordinatesState.longitude + 1})
      console.log("GoogleMapProps:")
    }
  
  },[mapState])
  // video example below:
  const { isLoaded } = useLoadScript({ googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY })

  if (!isLoaded) return <LoadingComp />
  return (
    <>
      <GoogleMap
        zoom={13}
        mapContainerStyle={isTWmd ? containerStyleTWmd : containerStyleTWsm}
        // center={restIdxHover < 0 ? center : { lat: showRestaurants[restIdxHover].latitude, lng: showRestaurants[restIdxHover].longitude }}
        center={center}
        onClick={()=>{
          console.log("map click")
          showRestaurants.forEach((rest, idx)=>{
            if(rest.showInfoBox) {
              console.log("idx:",idx)
              setShowRestaurantsState(draft=>{
                draft[idx].showInfoBox = false
              })
            }
          })
          
        }}

        // onClick={() => {
        //   console.log("click")
        //   console.log("infoBoxOpenArr:", infoBoxOpenArr)
        //   const filteredArr = infoBoxOpenArr.filter((ib) => {
        //     return ib.isOpen === true
        //   })
        //   console.log("filteredArr:", filteredArr)
        //   filteredArr.forEach((ib) => {
        //     setInfoBoxOpenArr((draft) => {
        //       draft[ib.idx].isOpen = false
        //     })
        //   })
        // }}
      // center={centerState}
      >
        {/* <OverlayView
          position={center}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div> */}


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