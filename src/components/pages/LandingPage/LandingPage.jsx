import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import CityCardContainer from './local_partials/CityCardContainer'
import CarouselContainer from './local_partials/CarouselContainer'

// {name: "", img_url:""},

export default function LandingPage({setNavigatedFlag, setSearchParams}) {
    const navigate = useNavigate()
    const handleCardClick = (e, cityName) => {
        e.preventDefault()
        setSearchParams((draft)=>{
            draft.address = cityName
        })
        setNavigatedFlag(true)
        navigate("/restaurants")
    }

    const [cityList] = useState([
        {
            name: "Los Angeles, CA", 
            img_url:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Hollywood_sign_%288485145044%29.jpg",
            bg_filepath:'\images/la_CA_card.svg'
        },
        {
            name: "Irvine, CA", 
            img_url:"https://www.visitcalifornia.com/sites/visitcalifornia.com/files/VC_IrvineSpectrumCenter_Stock_Irvine-Spectrum-Center-at-Dusk-CMF-8483_1280x640.jpg",
            bg_filepath:"\images/irvine_CA_card.svg"
        },
        {
            name: "Portland, OR", 
            img_url:"https://www.radiocab.net/wp-content/uploads/2020/03/blog-is-portland-a-safe-city.jpg",
            bg_filepath:"\images/portland_OR_card.svg"
        }
    ])
  
    const divWidth = `80vw`
    const divheight = `10vh`
  
    const cityCards = cityList.map((city) =>{
        return (
            <>
                <div
                    className={`relative w-[80vw] h-[15vh] my-3 hover:cursor-pointer`}
                    onClick={(e, cityName)=>{
                        e.preventDefault()
                        setSearchParams((draft)=>{
                            draft.address = city.name
                        })
                        setNavigatedFlag(true)
                        navigate("/restaurants")
                    }}
                
                >
                    <img 
                        className={`w-full h-full object-cover rounded-2xl opacity-[.6] hover:opacity-[.8]`}
                        src={city.img_url}
                    />
                    <div
                    className='absolute bottom-[10px] left-[10px]'
                    >
                        <p
                            className='text-[30px]'
                        >{city.name}</p>
                    </div>
                    
                </div>
            </>
        )
    })

   return (
    <div
        className='mt-[57px]'
    >
        {/* <div
        className='flex flex-col m-auto justify-center items-center'
        >
            {cityCards}
        </div>  */}
        {/* <p>Pikachu</p> */}

        <CarouselContainer/>

        <CityCardContainer
            handleCardClick={handleCardClick}
            CityArr={cityList}
        />
    </div>
  )
}
