import React, { useState } from 'react'
import { MarkerF, InfoBox, MarkerProps } from '@react-google-maps/api'
import { useNavigate } from "react-router-dom"
import { useImmer } from 'use-immer'
import RestListDetailCard from './RestListDetailCard'

export default function MarkerInfoBoxComp({
    labelNum,
    idx,
    restaurantData,
    markerOpacity,
    markerZidx,
    setShowRestaurantsState,
    showRestaurants,
    markersRef
    // infoBoxOpenArr,
    // setInfoBoxOpenArr
}) {
    const [showInfoBox, setShowInfoBox] = useState(false)
    const [markerState, setMarkerState] = useImmer({
        opacity: markerOpacity,
        zIdx: markerZidx
    })
    

    const markerOnLoad = marker => {
        const defaultOpacity = 0.7
        const hoverOpacity = 1.0
        const defaultZidx = 0
        const hoverZidx = 1
        // console.log("marker:", marker)
        // markersRef.current.add(marker)
        // console.log("markersRef:",markersRef.current)
        marker.setOpacity(defaultOpacity)
        marker.setZIndex(defaultZidx)
        marker.addListener("mouseover", ()=>{
            console.log("mouseOver")
            marker.setOpacity(hoverOpacity)
            marker.setZIndex(hoverZidx)
        })

        marker.addListener("mouseout", ()=>{
            console.log("mouseout")
            marker.setOpacity(defaultOpacity)
            marker.setZIndex(defaultZidx)
        })
    }

    // infobox loadouts
    const infoBoxOptions = {
        closeBoxURL: '',
        enableEventPropagation: true
    };
    const infoBoxOnLoad = infoBox => {
        // console.log('infoBox: ', infoBox)
        infoBox.pixelOffset = {
            height: -270,
            width: -100
        }
        infoBox.enableEventPropagation = false
        // infoBox.alignBottom = true
    };

    return (
        <>
            <MarkerF
                // ref={markerRef}
                key={`gMarker${restaurantData._id}`}
                // animation={"bounce"}
                onLoad={markerOnLoad}
                clickable={true}
                animation={window.google.maps.Animation.DROP}
                onClick={() => {
                    // console.log(`${restaurantData.name} clicked`)
                    // console.log("marker restaurantData:", restaurantData)
                    // setShowInfoBox(!showInfoBox)

                    // open/closes info box
                    setShowRestaurantsState((draft)=>{
                        let showInfoBoxVal = draft[idx].showInfoBox
                        draft[idx].showInfoBox = !showInfoBoxVal
                    })

                    // code to close other infoboxes (WIP)
                    for(let i; i < showRestaurants.length; i++){
                        if(i !== idx && showRestaurants[i].showInfoBox){
                            setShowRestaurantsState(draft=>{draft[i].showInfoBox = false})
                        }
                    }
                    // setInfoBoxOpenArr((draft)=>{
                    //     draft[idx].isOpen = true
                    // })
                }}
                label={`${labelNum}`}
                position={{ lat: restaurantData.latitude, lng: restaurantData.longitude }}
                opacity={markerState?.opacity}
                zIndex={markerState?.zIdx}
            />
            {
                showRestaurants[idx].showInfoBox &&
                <InfoBox
                    onLoad={infoBoxOnLoad}
                    options={infoBoxOptions}
                    position={{ lat: restaurantData.latitude, lng: restaurantData.longitude }}
                    // anchor={}
                >
                    
                    <RestListDetailCard
                        key={`mapInfoCard-${restaurantData._id}`}
                        restaurantInfo={restaurantData}
                        // dow={dow}
                        idx={idx}
                    />


                </InfoBox>
            }
        </>
    )
}
