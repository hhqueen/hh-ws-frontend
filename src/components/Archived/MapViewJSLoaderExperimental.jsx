import React, { useEffect, useState, useRef } from 'react'
import {createRoot} from "react-dom/client"
import {renderToString } from "react-dom/server"
import { flushSync } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import LoadingComp from '../Shared/LoadingComp'
import { Loader, LoaderStatus } from '@googlemaps/js-api-loader'
import RestListDetailCard from '../RestListDetailCard'


export default function MapViewJSLoaderExperimental({ coordinatesState, showRestaurants, isFetchingRestData }) {
    const mapRef = useRef(null)
    const markersRef = useRef([])
    const infoBoxRef = useRef([])
    const navigate = useNavigate()
    if (coordinatesState.latitude !== 0 || coordinatesState.longitude !== 0) {
        // let mapState

        const loader = new Loader({
            apiKey: process.env.REACT_APP_GMAPS_API_KEY,
            version: "beta",
            libraries: ["marker","places"]
        });

        loader
            .load()
            .then((google) => {
                // settings
                const defaultOpacity = 0.7
                const hoverOpacity = 1.0
                const defaultZidx = 0
                const hoverZidx = 1
                

                const mapOptions = {
                    center: {
                        lat: coordinatesState.latitude,
                        lng: coordinatesState.longitude
                    },
                    zoom: 13
                };

                const mapState = new google.maps.Map(mapRef.current, mapOptions);
                console.log("google maps version:",google.maps.version) 

                showRestaurants.forEach(async (rest, idx) => {
                    const restCoord = { lat: rest.latitude, lng: rest.longitude }
                    const pinView = google.maps.marker.PinView({
                        
                    })
                    const marker = google.maps.marker.AdvancedMarkerView({
                        map: mapState,
                        position: restCoord,
                        content: pinView.element
                    })
                    markersRef.current[idx] = marker
                })
                console.log("markersRef:",markersRef)
            })
            .catch(e => {
                // do something
                console.log("gmap Loader Error:", e)
            });
    }

    useEffect(()=>{

    })


    // set markers for useEffect?
    if (isFetchingRestData) return <LoadingComp />
    return (
        <div
            id='map'
            ref={mapRef}
            className='w-[50vw] h-full'
        >
            map
        </div>
    )
}
