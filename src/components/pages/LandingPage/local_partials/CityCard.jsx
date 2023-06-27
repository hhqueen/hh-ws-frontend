import React from 'react'
import visitorActivityLogger from '../../../../helperFunctions/visitorActivityLogger'

export default function CityCard({ CityData,handleCardClick, visitorActivityLogger }) {

    // console.log("CityData:",CityData)
    return (
        <>
            <div
                className={`flex flex-col h-fit py-2 w-[220px] md:mx-3 md:h-[290px] md:w-[220px] hover:cursor-pointer`}
                onClick={async (e)=>{
                    try {
                        handleCardClick(e,CityData?.name)
                        visitorActivityLogger()
                    } catch (error) {
                        console.log(error)
                    }

                }}
            >
                <img
                    className=' min-h-[290px] w-full h-full object-cover border-2 rounded-[15px]'
                    src={CityData?.img_url}
                    alt='image'
                />

                {/* <p>pi pi pikachu</p> */}
                <p
                    className='font-bold'
                >{CityData?.name}</p>
            </div>

        </>
    )
}
