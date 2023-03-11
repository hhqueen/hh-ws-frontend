import React, { useState, useContext } from 'react'
import { MarkerF, InfoBox } from '@react-google-maps/api'
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
    showRestaurants
    // infoBoxOpenArr,
    // setInfoBoxOpenArr
}) {
    const [showInfoBox, setShowInfoBox] = useState(false)
    const [markerState, setMarkerState] = useImmer({
        opacity: markerOpacity,
        zIdx: markerZidx
    })
    const navigate = useNavigate()
    

    const markerOnLoad = marker => {
        // console.log("marker:", marker)
    }

    // infobox loadouts
    const infoBoxOptions = {
        closeBoxURL: '',
        enableEventPropagation: true
    };
    const infoBoxOnLoad = infoBox => {
        console.log('infoBox: ', infoBox)
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
                key={`gMarker${restaurantData._id}`}
                // animation={"bounce"}
                onLoad={markerOnLoad}
                clickable={true}
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
