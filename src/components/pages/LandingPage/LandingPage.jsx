// libraries
import React, { useEffect, useState, useContext } from 'react'
import { useImmer } from "use-immer"
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'


// functions
import qStringfromObj from '../../../helperFunctions/qStringfromObj'
import {callServer} from "../../../helperFunctions/backendHelper"

// components
import CityCardContainer from './local_partials/CityCardContainer'
import CarouselContainer from './local_partials/CarouselContainer'
import appendSearchHistory from '../../../helperFunctions/appendSearchHistory'
import apiLogger from '../../../helperFunctions/apiLogger'
import NewHHTextContainer from './local_partials/NewHHTextContainer'
import LoadingComp from '../../Shared/LoadingComp'

// context
import { GlobalStateContext } from '../../context/GlobalStateContext'
import axios from 'axios'



// {name: "", img_url:""},

export default function LandingPage({ setAddressState, setSearchParams, mainDivStyle }) {
    const [cityList, setCityList] = useState([
        {
            name: "Los Angeles, CA",
            img_url: "https://res.cloudinary.com/hhqueen/image/upload/v1676041916/website_assets/los_angeles_sgxwgj.png",
            bg_filepath: '\images/la_CA_card.svg'
        },
        {
            name: "Orange County, CA",
            img_url: "https://res.cloudinary.com/hhqueen/image/upload/v1676041900/website_assets/Irvine-Spectrum-Outdoor-Shopping_mxicq9.png",
            bg_filepath: "\images/irvine_CA_card.svg"
        },
        {
            name: "Portland, OR",
            img_url: "https://res.cloudinary.com/hhqueen/image/upload/v1676041915/website_assets/photo-old-town-oregon-portland_xipagl.png",
            bg_filepath: "\images/portland_OR_card.svg"
        }
    ])

    const [nearByCities, setNearByCities] = useImmer([])


    const navigate = useNavigate()
    const globalVar = useContext(GlobalStateContext)


    const componentName = "Landing Page"

    const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })

    const handleCardClick = (e, cityName) => {
        e.preventDefault()
        setSearchParams((draft) => {
            draft.address = cityName
        })
        // setNavigatedFlag(true)
        setAddressState(cityName)
        appendSearchHistory("", cityName)
        navigate("/restaurants")
    }

    useEffect(() => {
        const logUserHit = async () => {
            const apiLogReponse = await apiLogger(componentName).data
            console.log("apiLogReponse:", apiLogReponse)
        }
        logUserHit()
    }, [])

    useEffect(() => {
        const getNearbyCities = async () => {
            let nearByCitiesToRenderArr = []
            try {
                const { latitude, longitude } = globalVar.currentLocationState
                const qObj = {
                    latitude: latitude,
                    longitude: longitude,
                    distance: 20,
                    rangeUOM: "mi"
                }
                // const qString = qStringfromObj(qObj)
                const gotNearbyCities = await axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics/TopThreeCitiesNearMe${qStringfromObj(qObj)}`)
                console.log("gotNearbyCities", gotNearbyCities.data)
                let num = 3

                for (let i = 0; i < num; i++) {
                    // console.log(`gotNearbyCities[${i}]:`, gotNearbyCities[i].data)
                    const { city, state } = gotNearbyCities.data[i]._id
                    nearByCitiesToRenderArr.push({ name: `${city}, ${state}` })
                }
                console.log("nearByCitiesToRenderArr:", nearByCitiesToRenderArr)

            } catch (error) {
                console.log(error)
            } finally {
                setNearByCities(nearByCitiesToRenderArr)
            }
        }

        // console.log("globalVar", globalVar)
        if (globalVar.geoLocationPermission) {
            console.log("getNearBy Cities exec")
            getNearbyCities()
        }
    }, [globalVar])

    let renderNearbyCitiesContainer = <></>
    console.log("nearByCities:", nearByCities)
    if (nearByCities.length > 0) {
        renderNearbyCitiesContainer =
            <>
                <div
                    className='mb-10'
                >
                    <CityCardContainer
                        headerText='Nearby Cities'
                        CityArr={nearByCities}
                        handleCardClick={handleCardClick}
                    />
                </div>
            </>
    }  


    return (
        <div
            style={isTWmd ? mainDivStyle : {}}
            className=''
        >
            <CarouselContainer />


            {renderNearbyCitiesContainer}


            <CityCardContainer
                headerText='Featured Locations'
                handleCardClick={handleCardClick}
                CityArr={cityList}
            />
            {/* 
            <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=AZose0lg8HzHaGIx6r6QwHA_t_xQSbYoT-47qtoXMgfO9W5iBc_VzW7JLZahSIjfzKJ2eVG0eFrgSDJVmjavxxL0sr3agiDiLUTSmA_qBaQospxCsBunOet49xh60p6-8VtnVTTdGmqsB8g9qSKvT9Y-LUiMaLzqKt1YyVRoFusfSt_CNYvY&key=${process.env.REACT_APP_GMAPS_API_KEY}`}
            ></img> */}
            <NewHHTextContainer />
        </div>
    )
}
