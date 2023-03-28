import React, {useRef, useEffect, useState} from 'react'
import { createRoot } from "react-dom/client"
import {Wrapper} from "@googlemaps/react-wrapper"

export default function MapGMapWrapper({
    coordinatesState, showRestaurants, isFetchingRestData
}) {


  return (
    <>
        <Wrapper
            apiKey={process.env.REACT_APP_GMAPS_API_KEY}
            version="beta"
            libraries={["marker"]}
        >
            <MyMap/>
        </Wrapper>
    </>
  )
}



function MyMap({mapOptions}){
        const [map, setMap] = useState()
        
        const ref = useRef()
        
        // const mapOptions = {
        //     center: {
        //         lat: coordinatesState.latitude,
        //         lng: coordinatesState.longitude
        //     },
        //     zoom:13,
        // }

        
        // useEffect(()=>{
        //     setMap(new window.google.maps.Map(ref.current, mapOptions))
        // },[])

    return (
        <div
            ref={ref}
            id="map"
            className='w-[50vw] h-full'
        >Script Loaded</div>
    )
}