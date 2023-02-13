import React from 'react'
import { GoogleMap, useLoadScript, LoadScript, Marker  } from '@react-google-maps/api'
import { useMediaQuery } from 'react-responsive';

const containerStyleTWmd = {
  width: `700px`,
  height: `100%`
}

const containerStyleTWsm = {
  width: `100%`,
  height: `300px`
}



export default function MapViewComp({showRestaurants, coordinatesState}) {
  // const { isLoaded, loadError, url } =  useLoadScript({ 
  //   googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY,
  // })
  const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })
  const center = {
    lat: coordinatesState.latitude,
    lng: coordinatesState.longitude
  };

  const mapMarkers = showRestaurants.map((rest, idx)=>{
    const labelNum = idx + 1
    return (
      <>
        <Marker
          // animation={"DROP"}
          label={`${labelNum}`}
          position={{lat:rest.latitude , lng:rest.longitude }}
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
          zoom={12}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <>
            {mapMarkers}
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
