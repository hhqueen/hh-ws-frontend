import React, { useEffect, useState, useRef } from 'react'
import {createRoot} from "react-dom/client"
import {renderToString } from "react-dom/server"
import { flushSync } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import LoadingComp from './LoadingComp'
import { Loader, LoaderStatus } from '@googlemaps/js-api-loader'
import RestListDetailCard from './RestListDetailCard'


export default function MapViewJSLoaderExperimental({ coordinatesState, showRestaurants, isFetchingRestData }) {
    const [mapState, setMapState] = useState()
    const mapRef = useRef()
    const navigate = useNavigate()
    if (coordinatesState.latitude !== 0 || coordinatesState.longitude !== 0) {
        // let mapState

        const loader = new Loader({
            apiKey: process.env.REACT_APP_GMAPS_API_KEY,
            version: "beta",
            libraries: ["marker"]
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

                let pinArr = []
                // creates the google map at div with id "map"
                // const mapState = new google.maps.Map(document.getElementById("map"), mapOptions);
                // console.log("gmaps version:",google.maps.version) 
                setMapState(new google.maps.Map(mapRef.current, mapOptions))
                // generates markers based on showRestaurant Array
                // showRestaurants.forEach(async (rest, idx) => {
                //     const restPos = { lat: rest.latitude, lng: rest.longitude }


                //     const newMarker = new google.maps.marker.AdvancedMarkerView({
                //         map: mapState,
                //         position: restPos
                //     })
                //     // let newMarker = new google.maps.Marker({
                //     //     position: restPos,
                //     //     map: mapState,
                //     //     label: String(idx + 1),
                //     //     zIndex: defaultZidx,
                //     //     opacity: defaultOpacity,
                //     //     animation: google.maps.Animation.DROP
                //     // })


                //     // pinArr.push(newMarker)
                //     // let newInfoWindow = new google.maps.InfoWindow({
                //     //     content: ""
                //     // })
                //     // google.maps.event.addListener(newInfoWindow, "domready", ()=>{
                //     //     const content = (
                //     //         <RestListDetailCard
                //     //             key={`mapInfoCard-${rest._id}`}
                //     //             restaurantInfo={rest}
                //     //             idx={idx}
                //     //         />
                //     //     )

                //     //     newInfoWindow.addListener("click", () => {
                //     //         console.log("infowindow clicked")
                //     //         // navigate(`/restaurant/${rest._id}`)
                //     //     })
                        
                //     //     newInfoWindow.setContent(content)

                //     // })

                //     // newMarker.addListener("click", () => {
                //     //     const getData = newInfoWindow.get()
                //     //     console.log(getData)
                //     //     console.log(`${rest.name} marker clicked`)
                //     //     newInfoWindow.open({
                //     //         anchor: newMarker,
                //     //         map: mapState
                //     //     })
                //     //     // const div = document.createElement("div")
                //     //     // const card = createRoot(div)
                //     //     // flushSync(()=>{
                //     //     //     card.render(                            
                //     //     //     <RestListDetailCard
                //     //     //         key={`mapInfoCard-${rest._id}`}
                //     //     //         restaurantInfo={rest}
                //     //     //         idx={idx}
                //     //     //     />)
                //     //     // })

                //     //     // const content = renderToString(
                //     //     //     <RestListDetailCard
                //     //     //         key={`mapInfoCard-${rest._id}`}
                //     //     //         restaurantInfo={rest}
                //     //     //         idx={idx}
                //     //     //     />
                //     //     // )
                //     //     // const content = (
                //     //     //     <RestListDetailCard
                //     //     //         key={`mapInfoCard-${rest._id}`}
                //     //     //         restaurantInfo={rest}
                //     //     //         idx={idx}
                //     //     //     />
                //     //     // )

                //     //     // newInfoWindow.addListener("click", () => {
                //     //     //     console.log("infowindow clicked")
                //     //     //     // navigate(`/restaurant/${rest._id}`)
                //     //     // })
                        
                //     //     // newInfoWindow.setContent(content)
                //     //     // newInfoWindow.open({
                //     //     //     anchor: newMarker,
                //     //     //     map: mapState
                //     //     // })
                //     // })

                //     // newMarker.addListener("mouseover", () => {
                //     //     newMarker.setOpacity(hoverOpacity)
                //     //     newMarker.setZIndex(hoverZidx)
                //     //     // newMarker.setAnimation(google.maps.Animation.BOUNCE)
                //     // })
                //     // newMarker.addListener("mouseout", () => {
                //     //     newMarker.setOpacity(defaultOpacity)
                //     //     newMarker.setZIndex(defaultZidx)
                //     //     // newMarker.setAnimation(null)
                //     // })


                //     // console.log("marker position:",newMarker.getPosition())
                // })
            })
            .catch(e => {
                // do something
                console.log("gmap Loader Error:", e)
            });
    }


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
