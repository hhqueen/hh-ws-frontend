// import Libraries
import React, { useState, useEffect, useTransition, Suspense } from 'react'
import axios from "axios"
import { useImmer } from 'use-immer'


// helper functions
import callServer from '../../../helperFunctions/backendHelper'

// import Comps
import TopRestaurantsContainer from './partials/TopRestaurantsContainer'
import DashBoard from './DashBoard'
import WeeklyEmailSubs from './partials/WeeklyEmailSubs'
import DailyVisitors from './partials/DailyVisitors'
import RegisteredProfiles from './partials/RegisteredProfiles'
import TopThreeRestPerCity from './partials/TopThreeRestPerCity'
import TotalRestaurants from './partials/TotalRestaurants'
import LoadingComp from '../../Shared/LoadingComp'


// custom hooks

export default function DashBoardContainer({ mainDivStyle }) {
    const [isFetching, startTransition] = useTransition()

    const [apiLogData, setApiLogData] = useState([])
    const [restaurantViewLogs, setRestaurantViewLogs] = useState([])

    const [totalRestNum, setTotalRestNum] = useState(0)
    const [pageVisitData, setPageVisitData] = useImmer([])
    const [dailyVisitors, setDailyVisitors] = useImmer([])


    useEffect(() => {
        const queryData = async () => {
            try {
                const promiseArr = [
                    await callServer({ route: "analytics/totalNumberOfRestaurants" }),
                    await callServer({ route: "analytics/RestaurantVisits" }),
                    await callServer({ route: "analytics/dailyVistors" }),
                ]


                const settledPromises = await Promise.allSettled(promiseArr)
                console.log("settledPromises", settledPromises)

                const [
                    { value: { data: totalRestNumResponse } },
                    { value: { data: restaurantVisitsResponse } },
                    { value: { data: dailyVisitorsResponse } },
                ] = settledPromises

                // console.log("restaurantVisitsResponse", restaurantVisitsResponse)
                startTransition(() => {
                    setTotalRestNum(totalRestNumResponse)
                    setPageVisitData(restaurantVisitsResponse)
                    setDailyVisitors(dailyVisitorsResponse)
                })

            } catch (error) {
                console.log(error)
            }
        }
        queryData()
    }, [])

    return (
        <>
            <Suspense fallback={<LoadingComp />}>
                <div
                    className='flex flex-col'
                    style={mainDivStyle}
                >
                    {/* Heading */}
                    <section
                        className='flex items-center justify-center w-full h-fit'
                    >
                        <p
                            className='text-[100px]'
                        >HHQ Dashboard</p>
                    </section>
                    {/* <DashBoard/> */}
                    <section
                        className='flex flex-col items-center justify-center font-bold text-2xl'
                    >

                        <TotalRestaurants
                            passedRestTotalNum={totalRestNum}
                        />

                    </section>

                    <section
                        className='flex flex-col justify-center items-center'
                    >
                        <TopRestaurantsContainer
                            pageVisitData={pageVisitData}
                        />
                        <DailyVisitors
                            dailyVisitors={dailyVisitors}
                        />
                    </section>

                    {/* <section
                    className='flex items-center justify-center'
                >
                    <Suspense fallback={<LoadingComp />}>

                    </Suspense>
                </section> */}
                    {/* <section
                    className='flex items-center justify-center'
                >
                    <RegisteredProfiles />
                </section>
                <section
                    className='flex items-center justify-center'
                >
                    <WeeklyEmailSubs />
                </section> */}
                </div>
            </Suspense>
        </>
    )
}
