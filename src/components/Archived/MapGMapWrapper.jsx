import React, {useRef, useEffect, useState} from 'react'
import { createRoot } from "react-dom/client"
import { Wrapper } from "@googlemaps/react-wrapper"

export default function MapGMapWrapper({
    coordinatesState, showRestaurants, isFetchingRestData
}) {
    const [map, setMap] = useState()
        
    const mapRef = useRef()
    const mapOptions = {
        center: {
            lat: coordinatesState.latitude,
            lng: coordinatesState.longitude
        },
        zoom: 13
    };
    useEffect(()=>{
        setMap(new window.google.maps.Map(mapRef.current,mapOptions))
    },[])
  return (
    <>
        <Wrapper
            apiKey={process.env.REACT_APP_GMAPS_API_KEY}
            version="beta"
            libraries={["places","marker"]}
        >
            <div
                ref={mapRef}
                id="mapV1"
                className='w-[50vw] h-full'
            >Script Loaded</div>
        </Wrapper>
    </>
  )
}