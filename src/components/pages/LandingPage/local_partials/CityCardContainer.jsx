import React from 'react'
import CityCard from "./CityCard"
import visitorActivityLogger from "../../../../helperFunctions/visitorActivityLogger"


export default function CityCardContainer({ headerText = "", CityArr = [], handleCardClick }) {

    // console.log("cityCard this:", window)
    const mapCityArry = CityArr.map((city) => {
        // console.log("cityData_fromArr:", city)

        return (
            <>
                <CityCard
                    CityData={city}
                    handleCardClick={handleCardClick}
                    visitorActivityLogger={()=>{
                        visitorActivityLogger({
                        elementId: "va1",
                        value: city.name,
                        message: `User clicked ${headerText} ${city.name} from Landing Page`
                    })
                }}
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
                    className='py-3 font-bold text-[sm] md:text-[25px]'
                >{headerText}</p>
                <div
                    className='flex flex-col md:flex-row justify-between items-center w-full'
                >
                    {mapCityArry}
                </div>
            </div>
        </div>
    )
}
