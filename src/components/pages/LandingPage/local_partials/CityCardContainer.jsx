import React from 'react'
import CityCard from "./CityCard"

export default function CityCardContainer({ CityArr, handleCardClick }) {
    const emailProps = {
        email: "hhqueen.official@gmail.com",
        subject: "new HHQ submission request",
        body: "Please tell us about your restaurant or provide a website URL"
    }

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
