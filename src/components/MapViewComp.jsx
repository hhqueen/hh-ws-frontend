import React, { useState, useEffect } from 'react'
import { GoogleMap, useLoadScript, LoadScript, MarkerF, MarkerProps, Marker } from '@react-google-maps/api'
import { useMediaQuery } from 'react-responsive';
import LogoSmall from './Logo/LogoSmall';

const containerStyleTWmd = {
  width: `700px`,
  height: `100%`
}

const containerStyleTWsm = {
  width: `100%`,
  height: `300px`
}



export default function MapViewComp({ showRestaurants, coordinatesState ,restIdxHover }) {
  const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })
  const center = {
    lat: coordinatesState.latitude,
    lng: coordinatesState.longitude
  };
  
  const [renderMarkers, setRenderMarkers] = useState(<></>)

  // useEffect(()=>{
  //   // console.log("restIdxHover:", restIdxHover)
  //   setRenderMarkers(loadMarkers(showRestaurants))
  // },[])

  // const loadMarkers = (restArray) => {
  //   return restArray.map((rest, idx) => {
  //     const labelNum = idx + 1
  //     return (
  //       <>
  //         <MarkerF
  //           title={rest.name}
  //           animation={"bounce"}
  //           clickable={true}
  //           onClick={()=>{console.log(`${rest.name} clicked`)}}
  //           label={`${labelNum}`}
  //           position={{ lat: rest.latitude, lng: rest.longitude }}
  //           // opacity={idx == restIdxHover ? 1.0 : 0.5}
  //           opacity={1.0}
  //         />
  //       </>
  //     )
  //   })
  // }
  const mapMarkers = showRestaurants.map((rest, idx) => {
    const labelNum = idx + 1
    return (
      <>
        <MarkerF
          animation={"bounce"}
          clickable={true}
          onClick={()=>{console.log(`${rest.name} clicked`)}}
          label={`${labelNum}`}
          position={{ lat: rest.latitude, lng: rest.longitude }}
          opacity={1.0}
          
        />
      </>
    )
  })

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GMAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={isTWmd ? containerStyleTWmd : containerStyleTWsm}
        center={center}
        zoom={13}
      >
        {/* render center marker */}
          <MarkerF
            animation={"bounce"}
            icon={'https://res.cloudinary.com/hhqueen/image/upload/w_50,c_scale/v1675632375/website_assets/hhq-icon_tgc27d.png'}
            clickable={true}
            onClick={()=>{console.log("center clicked")}}
            position={center}
            />

        { /* Child components, such as markers, info windows, etc. */}
        <>
          {mapMarkers}
          {/* {renderMarkers} */}
        </>
      </GoogleMap>
    </LoadScript>
  )

}
//   if (!mapIsLoaded) return <LoadingComp />

//   return (
//     <MapComp/>
//   )
// }
