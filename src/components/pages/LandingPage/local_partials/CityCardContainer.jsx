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
            className='flex justify-center items-center border h-[500px]'
        >{mapCityArry}
            {/* <p>pi pikachu</p> */}
        </div>
    )
}
