import React from 'react'
import CityCard from "./CityCard"

export default function CityCardContainer({ CityArr, handleCardClick }) {
    const bodyLines = [// implented per Feature# 75
        'Location Name:', 
        'Location Address:', 
        'Days and Hours of happy hour:',
        'Are you dog friendly?',
        'Do you have a patio or rooftop?',
        'Attach high resolution picture of HH menu.'
    ]
    const bodyStringBuilder = (stringArr) => {// implented per Feature# 75
        const newLineString = '%0D'
        let formattedString = stringArr[0]
        for(let i=1;i<stringArr.length;i++){
            formattedString+=newLineString+stringArr[i]
        }
        return formattedString
    }
    
    const emailProps = {
        email: "hhqueen.official@gmail.com",
        subject: "new HHQ submission request",
        body: bodyStringBuilder(bodyLines) // implented per Feature# 75
    }
    console.log("cityCard this:", window)
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
                    className='py-3 font-bold text-[sm] md:text-[25px]'
                >Featured Locations</p>
                <div
                    className='flex flex-col md:flex-row justify-between items-center w-full'
                >
                    {mapCityArry}
                    {/* <p>pi pikachu</p> */}
                </div>
                <div
                    className='py-10 text-center text-sky-600 hover:underline hover:text-sky-800'
                >
                    <a
                        href={`mailto:${emailProps.email}?subject=${emailProps.subject}&body=${emailProps.body}`}
                    >
                        Are you a restaurant or bar with a happy hour to share? Submit your happy hour here.
                    </a>
                </div>

            </div>
        </div>
    )
}
