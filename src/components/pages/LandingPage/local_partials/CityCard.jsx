import React from 'react'

export default function CityCard({ CityData,handleCardClick }) {

    // console.log("CityData:",CityData)
    return (
        <>
            <div
                className={`flex flex-col h-[290px] w-[220px] hover:cursor-pointer`}
                onClick={(e)=>{handleCardClick(e,CityData.name)}}
            >
                <img
                    className='w-full h-full object-cover border-2 rounded-[15px]'
                    src={CityData.img_url}
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
