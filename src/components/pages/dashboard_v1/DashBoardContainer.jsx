// import Libraries
import React, { useState, useEffect } from 'react'
import axios from "axios"

// import Comps
import TopRestaurantsContainer from './partials/TopRestaurantsContainer'
import DashBoard from './DashBoard'
import WeeklyEmailSubs from './partials/WeeklyEmailSubs'
import DailyVisitors from './partials/DailyVisitors'
import RegisteredProfiles from './partials/RegisteredProfiles'
import TopThreeRestPerCity from './partials/TopThreeRestPerCity'
import TotalRestaurants from './partials/TotalRestaurants'

export default function DashBoardContainer({ mainDivStyle }) {
    const [apiLogData, setApiLogData] = useState([])
    const [restaurantViewLogs, setRestaurantViewLogs] = useState([])

    // useEffect(()=>{
    //     const queryData =  async ()=>{
    //         try {
    //             // get all api log data
    //             const getAllData = await axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics`)

    //             //filter data for not dev and set to apiLog State
    //             const filteredProdData = getAllData.data.filter((logItem) => {
    //                 // console.log(logItem)
    //                 return !logItem.endPointURL.includes("https://development")
    //             })
    //             setApiLogData(filteredProdData)

    //             // filter PROD Data for restaurant Views and set to state
    //             const filtered_PROD_RestaurantData = filteredProdData.filter((logItem)=>{
    //                 return logItem.endPointURL.includes("/restaurants/")
    //             })
    //             setRestaurantViewLogs(filtered_PROD_RestaurantData)
    //             console.log("filtered PROD Restaurant Data",filtered_PROD_RestaurantData)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     queryData()
    // },[])

    return (
        <>
            <div
                style={mainDivStyle}
            >
                {/* <DashBoard/> */}
                <section
                    className='flex flex-col items-center justify-center font-bold text-2xl'
                >
                    <TotalRestaurants />
                </section>

                <section>
                    <TopRestaurantsContainer />
                </section>

                <section
                    className='flex items-center justify-center'
                >
                    <DailyVisitors />
                </section>
                <section
                    className='flex items-center justify-center'
                >
                    <RegisteredProfiles />
                </section>
                <section
                    className='flex items-center justify-center'
                >
                    <WeeklyEmailSubs />
                </section>
            </div>
        </>
    )
}
