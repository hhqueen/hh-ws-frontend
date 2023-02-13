import React from 'react'
import { GoogleMap, LoadScript, Marker  } from '@react-google-maps/api'

const containerStyle = {
  width: `700px`,
  height: `100%`
}



export default function MapViewComp({showRestaurants, coordinatesState}) {
  // const { isLoaded, loadError, url } =  useLoadScript({ 
  //   googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY,
  // })

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
          mapContainerStyle={containerStyle}
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
