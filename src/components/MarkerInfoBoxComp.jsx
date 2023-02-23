import React, { useState } from 'react'
import { Marker, InfoBox } from '@react-google-maps/api'
import { useNavigate } from "react-router-dom"

export default function MarkerInfoBoxComp({
    labelNum,
    idx,
    restaurantData,
    markerOpacity,
    markerZidx
}) {
    const [showInfoBox, setShowInfoBox] = useState(false)
    const navigate = useNavigate()
    
    // infobox loadouts
    const infoBoxOptions = { closeBoxURL: '', enableEventPropagation: true };
    const infoBoxOnLoad = infoBox => {
        console.log('infoBox: ', infoBox)
        infoBox.pixelOffset = {
            height: -200,
            width: -100
        }
    };

    return (
        <>
            <Marker
                key={`gMarker${restaurantData._id}`}
                // animation={"bounce"}
                clickable={true}
                onClick={() => {
                    // console.log(`${restaurantData.name} clicked`)
                    // console.log("marker restaurantData:", restaurantData)
                    setShowInfoBox(!showInfoBox)
                }}
                label={`${labelNum}`}
                position={{ lat: restaurantData.latitude, lng: restaurantData.longitude }}
                opacity={markerOpacity}
                zIndex={markerZidx}
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
