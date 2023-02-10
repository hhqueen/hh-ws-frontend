import React from 'react'
import { GoogleMap,useLoadScript, LoadScript  } from '@react-google-maps/api'

const containerStyle = {
  width: `700px`,
  height: `100%`
}



export default function MapViewComp({currentLocation}) {
  const { isLoaded, loadError, url } =  useLoadScript({ 
    googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY,
  })

  const center = {
    lat: currentLocation.latitude,
    lng: currentLocation.longitude
  };

  return (
    <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GMAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
  )

}
//   if (!mapIsLoaded) return <LoadingComp />

//   return ( 
//     <MapComp/>
//   )
// }
