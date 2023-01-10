import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

// {name: "", img_url:""},

export default function LandingPage({setNavigatedFlag, setSearchParams}) {
    const navigate = useNavigate()

    const [cityList, setCityList] = useState([
        {name: "Los Angeles, CA", 
            img_url:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Hollywood_sign_%288485145044%29.jpg"},
        {name: "Orange County, CA", 
            img_url:"https://www.visitcalifornia.com/sites/visitcalifornia.com/files/VC_IrvineSpectrumCenter_Stock_Irvine-Spectrum-Center-at-Dusk-CMF-8483_1280x640.jpg" },
        {name: "Portland, OR", 
            img_url:"https://deih43ym53wif.cloudfront.net/seattle-usa-shutterstock_503999926_3aeb59a163.jpeg" }
    ])
  
    const divWidth = '80vw'
    const divheight = '20vh'
  
    const cityCards = cityList.map((city) =>{
        return (
            <>
                <div
                    className={`relative w-[${divWidth}] h-[${divheight}] my-10`}
                    onClick={(e)=>{
                        e.preventDefault()
                        setSearchParams((draft)=>{
                            draft.address = city.name
                        })
                        setNavigatedFlag(true)
                        navigate("/restaurants")
                    }}
                
                >
                    <img 
                        className={`w-full h-full object-cover rounded-2xl`}
                        src={city.img_url}
                    />
                    <div
                    className='absolute bottom-0 left-[10px]'
                    >
                        <p
                            className='text-[30px] text-[white]'
                        >{city.name}</p>
                    </div>
                    
                </div>
            </>
        )
    })

   return (
    <div
        className='mt-[200px]'
    >
        <div
        className='flex flex-col m-auto justify-center items-center'
        >
            {cityCards}
        </div> 
    </div>
  )
}
