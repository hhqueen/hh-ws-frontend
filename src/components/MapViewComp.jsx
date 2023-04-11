import React, {useMemo, useEffect} from 'react'
// import { GoogleMap, LoadScript, useLoadScript, MarkerF, useJsApiLoader, InfoWindow, Marker } from '@react-google-maps/api'
import { GoogleMap, useLoadScript, MarkerF} from '@react-google-maps/api'
import { useMediaQuery } from 'react-responsive';
import LoadingComp from './Shared/LoadingComp';
import MarkerInfoBoxComp from './MarkerInfoBoxComp';



const loadScriptObj = { googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY, version: "beta", libraries: ["marker"] }

export default function MapViewComp({ 
  setShowRestaurantsState, 
  showRestaurants, 
  coordinatesState, 
  restIdxHover,
  contentHeight
}) {
  const { isLoaded } = useLoadScript(loadScriptObj)
  const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })
  const center = useMemo(() => ({ lat: coordinatesState.latitude, lng: coordinatesState.longitude }), [coordinatesState])

  let containerStyle = {
    sm:{
      width: `100vw`,
      height: `100%`
    },
    md: {
      width: `40vw`,
      height: `100%`
    },
  
  }

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
        />
      </>
    )
  })

  

  if (!isLoaded
    // && (coordinatesState.latitude == 0 && coordinatesState.longitude == 0) 
    // && isFetchingRestData
  ) return <LoadingComp />
  return (
    <>
      <GoogleMap
        // ref={mapRef}
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
    </>
  )
}