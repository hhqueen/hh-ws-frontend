import React, { useState } from 'react'
import { MarkerF, InfoBox } from '@react-google-maps/api'
import { useNavigate } from "react-router-dom"
import { useImmer } from 'use-immer'

export default function MarkerInfoBoxComp({
    labelNum,
    idx,
    restaurantData,
    markerOpacity,
    markerZidx,
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
        console.log("marker:", marker)
    }

    // infobox loadouts
    const infoBoxOptions = { 
        closeBoxURL: '', 
        enableEventPropagation: true 
    };
    const infoBoxOnLoad = infoBox => {
        console.log('infoBox: ', infoBox)
        infoBox.pixelOffset = {
            height: -200,
            width: -100
        }
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
                    setShowInfoBox(!showInfoBox)
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
                showInfoBox &&
                <InfoBox
                    onLoad={infoBoxOnLoad}
                    options={infoBoxOptions}
                    position={{ lat: restaurantData.latitude, lng: restaurantData.longitude }}
                >
                    <div
                        className="h-[160px] w-[200px] bg-white rounded-xl"
                        onClick={()=>{
                            navigate(`/restaurant/${restaurantData._id}`)
                        }}
                    >
                        <img
                            className='w-[200px] h-[130px] object-fit rounded-t-xl'
                            alt={`${restaurantData.name}`}
                            src={restaurantData.image_url}
                        />
                        <div
                            className='flex items-center justify-center text-center'
                        >

                            <p>{restaurantData?.name}</p>   
                        </div>
                    </div>

                </InfoBox>
            }
        </>
    )
}
