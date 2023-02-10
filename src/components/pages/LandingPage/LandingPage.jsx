import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import CityCardContainer from './local_partials/CityCardContainer'
import CarouselContainer from './local_partials/CarouselContainer'
import { useMediaQuery } from 'react-responsive'


// {name: "", img_url:""},

export default function LandingPage({setNavigatedFlag, setSearchParams, mainDivStyle}) {
    const navigate = useNavigate()
    
    
    const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })
    
    
    const handleCardClick = (e, cityName) => {
        e.preventDefault()
        setSearchParams((draft)=>{
            draft.address = cityName
        })
        setNavigatedFlag(true)
        navigate("/restaurants")
    }

    
    

    const [cityList, setCityList] = useState([
        {
            name: "Los Angeles, CA", 
            // img_url:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Hollywood_sign_%288485145044%29.jpg",
            bg_filepath:'\images/la_CA_card.svg'
        },
        {
            name: "Orange County, CA", 
            // img_url:"https://www.visitcalifornia.com/sites/visitcalifornia.com/files/VC_IrvineSpectrumCenter_Stock_Irvine-Spectrum-Center-at-Dusk-CMF-8483_1280x640.jpg",
            bg_filepath:"\images/irvine_CA_card.svg"
        },
        {
            name: "Portland, OR", 
            // img_url:"https://www.radiocab.net/wp-content/uploads/2020/03/blog-is-portland-a-safe-city.jpg",
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
