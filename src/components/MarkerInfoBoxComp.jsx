import React, { useState } from 'react'
import { MarkerF, InfoBox,  } from '@react-google-maps/api'
import { useImmer } from 'use-immer'
import RestListDetailCard from './RestListDetailCard'

export default function MarkerInfoBoxComp({
    labelNum,
    idx,
    restaurantData,
    setShowRestaurantsState,
    showRestaurants,
}) {
    const [markerState, setMarkerState] = useImmer({
        clicked: false,
        markerObj: null
    })

    
    

    const markerOnLoad = marker => {
        const defaultOpacity = 0.7
        const hoverOpacity = 1.0
        const defaultZidx = 0
        const hoverZidx = 1
        // console.log("marker:", marker)
        // markersRef.current.add(marker)
        // console.log("markersRef:",markersRef.current)
        setMarkerState(draft=>{draft.markerObj = marker})
        marker.setOpacity(defaultOpacity)
        marker.setZIndex(defaultZidx)
        marker.addListener("mouseover", ()=>{
            // console.log("mouseOver")
            marker.setOpacity(hoverOpacity)
            marker.setZIndex(hoverZidx)
        })

        marker.addListener("click", ()=>{
            // console.log("click")
            setMarkerState((draft)=>{draft.clicked = true})
        })

        marker.addListener("mouseout", ()=>{

            if(!markerState.clicked) {
                // console.log("mouseout")
                marker.setOpacity(defaultOpacity)
                marker.setZIndex(defaultZidx)
            }
        })
    }

    // infobox loadouts
    const infoBoxOptions = {
        closeBoxURL: '',
        enableEventPropagation: false
    };
    const infoBoxOnLoad = infoBox => {
        // console.log('infoBox: ', infoBox)
        infoBox.pixelOffset = {
            height: -170-39,
            width: -550/2
        }
        infoBox.anchor = markerState.markerObj
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
                    // open/closes info box
                        setShowRestaurantsState((draft)=>{
                            // iterates through all rests and close all other infoboxes not opened
                            draft.forEach((rest, lIdx)=>{
                                if(idx !== lIdx) {
                                    draft[lIdx].showInfoBox = false
                                } else {
                                    let showInfoBoxVal = draft[idx].showInfoBox
                                    draft[idx].showInfoBox = !showInfoBoxVal
                                }
                            })
                        })
                }}
                label={`${labelNum}`}
                position={{ lat: restaurantData.latitude, lng: restaurantData.longitude }}
                opacity={markerState?.opacity}
                zIndex={markerState?.zIdx}
            />
            {
                showRestaurants[idx].showInfoBox &&
                <InfoBox
                    anchor={markerState.markerObj}
                    onLoad={infoBoxOnLoad}
                    options={infoBoxOptions}
                    position={{ lat: restaurantData.latitude, lng: restaurantData.longitude }}
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
