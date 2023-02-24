import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import CityCardContainer from './local_partials/CityCardContainer'
import CarouselContainer from './local_partials/CarouselContainer'
import { useMediaQuery } from 'react-responsive'
import appendSearchHistory from '../../../helperFunctions/appendSearchHistory'
import apiLogger from '../../../helperFunctions/apiLogger'

// {name: "", img_url:""},

export default function LandingPage({setAddressState, setSearchParams, mainDivStyle}) {
    const navigate = useNavigate()
    const componentName = "Landing Page"
    
    const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })

    const handleCardClick = (e, cityName) => {
        e.preventDefault()
        setSearchParams((draft)=>{
            draft.address = cityName
        })
        // setNavigatedFlag(true)
        setAddressState(cityName)
        appendSearchHistory("", cityName)
        navigate("/restaurants")
    }

    useEffect(()=>{
        const logUserHit = async () => {
            const apiLogReponse = await apiLogger(componentName).data
            console.log("apiLogReponse:",apiLogReponse)
        }
        logUserHit()
    },[])
    

    const [cityList, setCityList] = useState([
        {
            name: "Los Angeles, CA", 
            img_url:"https://res.cloudinary.com/hhqueen/image/upload/v1676041916/website_assets/los_angeles_sgxwgj.png",
            bg_filepath:'\images/la_CA_card.svg'
        },
        {
            name: "Orange County, CA", 
            img_url:"https://res.cloudinary.com/hhqueen/image/upload/v1676041900/website_assets/Irvine-Spectrum-Outdoor-Shopping_mxicq9.png",
            bg_filepath:"\images/irvine_CA_card.svg"
        },
        {
            name: "Portland, OR", 
            img_url:"https://res.cloudinary.com/hhqueen/image/upload/v1676041915/website_assets/photo-old-town-oregon-portland_xipagl.png",
            bg_filepath:"\images/portland_OR_card.svg"
        }
    ])
    

   return (
    <div
        style={isTWmd ? mainDivStyle : {}}
        className=''
    >   
        <CarouselContainer/>

        <CityCardContainer
            handleCardClick={handleCardClick}
            CityArr={cityList}
        />
    </div>
  )
}
