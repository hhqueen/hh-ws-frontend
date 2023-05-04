import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TopRestaurants from "./TopRestaurants"

export default function TopRestaurantsContainer({ restaurantViewLogs }) {
    const [restVisitCountArr, setRestVisitCountArr] = useState([])
    const [numToRender, setNumToRender] = useState(10)
    useEffect(() => {
        // set to map for performance
        let restIdMap = new Map()
        // console.log("restaurantViewLogs:",restaura   ntViewLogs)
        restaurantViewLogs.forEach((logItem) => {
            const findStr = "/restaurants/"
            const idLength = 24
            const startIdx = logItem.endPointURL.indexOf(findStr) + findStr.length
            const restId = logItem.endPointURL.substring(startIdx, startIdx + idLength)
            if (restId.length < 24) return
            if (restIdMap.has(restId)) {
                restIdMap.set(restId, restIdMap.get(restId) + 1)
            } else {
                restIdMap.set(restId, 1)
            }
        })
        console.log("restIdMap:", restIdMap)

        const sortedArrFromRestIdMap = Array.from(restIdMap).sort((a, b) => { return b[1] - a[1] })
        console.log("sortedArrFromRestIdMap:", sortedArrFromRestIdMap)


        let promisesArr = []
        sortedArrFromRestIdMap.forEach(async (rest, idx) => {
            if (idx >= numToRender) return
            try {
                promisesArr.push(axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics/restaurant/${rest[0]}`))
            } catch (error) {
                console.log(error)
            }
        })

        let promiseStatus = []
        Promise.allSettled(promisesArr).then((status) => {
            console.log("status", status)
            promiseStatus = status
        })
        console.log("promiseStatus",promiseStatus)

        let populatedDataArr = []

        promiseStatus.forEach((promise) => {
            populatedDataArr.push({
                restId: promise.value.data._id,
                restData: promise.value.data,
                count: restIdMap[promise.value.data._id]
            })
            console.log("populatedDataArr:",populatedDataArr)
        })
        // console.log("promiseStatuses:",promiseStatuses)

        console.log("populatedDataArr All pushed:",populatedDataArr)
        // setRestVisitCountArr(populatedDataArr)
    }, [restaurantViewLogs])
    return (
        <div>
            <TopRestaurants
                restVisitCountArr={restVisitCountArr}
            />
        </div>
    )
}
