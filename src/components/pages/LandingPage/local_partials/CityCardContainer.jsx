import React from 'react'
import CityCard from "./CityCard"

export default function CityCardContainer({ CityArr, handleCardClick }) {
    const mapCityArry = CityArr.map((city) => {
        // console.log("cityData_fromArr:", city)
        return (
            <>
                <CityCard
                    CityData={city}
                    handleCardClick={handleCardClick}
                />
            </>

        )
    })
    return (
        <div
            className='flex flex-col justify-center items-center'
        >
            <div>
                <p
                    className='py-3 font-bold text-[25px]'
                >Featured Locations</p>
                <div
                    className='flex justify-between items-center w-[50vw]'
                >
                    {mapCityArry}
                    {/* <p>pi pikachu</p> */}
                </div>
            </div>
        </div>
    )
}
