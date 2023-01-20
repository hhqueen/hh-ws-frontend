import React from 'react'

export default function CityCard({ CityData,handleCardClick }) {

    // console.log("CityData:",CityData)
    return (
        <>
            <div
                className={`flex flex-col h-[384px] w-[242px] mx-[37px] hover:cursor-pointer`}
                onClick={(e)=>{handleCardClick(e,CityData.name)}}
            >
                <img
                    className='w-full h-[329px] object-cover border-2 rounded-[15px]'
                    src={CityData.bg_filepath}
                    alt='image'
                />

                {/* <p>pi pi pikachu</p> */}
                <p
                    className=''
                >{CityData?.name}</p>
            </div>

        </>
    )
}
