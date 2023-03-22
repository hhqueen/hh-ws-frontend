import React, { useEffect, useState } from 'react'
import LoadingComp from './LoadingComp'
import { Loader, LoaderStatus } from '@googlemaps/js-api-loader'
import RestListDetailCard from './RestListDetailCard'


export default function MapViewJSLoaderExperimental({ coordinatesState, showRestaurants, isFetchingRestData }) {
    // const [mapState, setMapState] = useState(null)

    if (coordinatesState.latitude !== 0 || coordinatesState.longitude !== 0) {
        let mapState
        let markersMap = new Map()
        // let infoBoxMap = new Map()
        
        const loader = new Loader({
            apiKey: process.env.REACT_APP_GMAPS_API_KEY,
            version: "weekly",
            libraries: ["places"]
        });

        const mapOptions = {
            center: {
                lat: coordinatesState.latitude,
                lng: coordinatesState.longitude
            },
            zoom: 13
        };

        loader
            .load()
            .then((google) => {
                // settings
                const defaultOpacity = 0.7
                const hoverOpacity = 1.0
                const defaultZidx = 0
                const hoverZidx = 1

                // creates the google map at div with id "map"
                mapState = new google.maps.Map(document.getElementById("map"), mapOptions);

                // generates markers based on showRestaurant Array
                showRestaurants.forEach((rest, idx) => {
                    const restPos = { lat: rest.latitude, lng: rest.longitude }
                    let newMarker = new google.maps.Marker({
                        position: restPos,
                        map: mapState,
                        label: String(idx + 1),
                        zIndex:defaultZidx,
                        opacity:defaultOpacity,
                        animation: google.maps.Animation.DROP
                    })

                    // let newInfoWindow = new google.maps.InfoWindow({
                    //     content: "<div className='w-[100px] h-[100px]'>123</div>"
                    // })

                    // newMarker.addListener("click",()=>{
                    //     console.log("marker clicked")
                    //     newInfoWindow.open({
                    //         anchor: restPos,
                    //         map: mapState
                    //     })
                    // })

                    newMarker.addListener("mouseover", ()=>{
                        newMarker.setOpacity(hoverOpacity)
                        newMarker.setZIndex(hoverZidx)
                    })
                    newMarker.addListener("mouseout", ()=>{
                        newMarker.setOpacity(defaultOpacity)
                        newMarker.setZIndex(defaultZidx)
                    })


                    // console.log("marker position:",newMarker.getPosition())
                })
            })
            .catch(e => {
                // do something
                console.log("gmap Loader Error:", e)
            });
    }


    // set markers for useEffect?
    if(isFetchingRestData) return <LoadingComp/>
    return (
        <div
            id='map'
            className='w-[50vw] h-full'
        >
        </div>
    )
}
