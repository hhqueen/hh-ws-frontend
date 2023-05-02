import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TopRestaurants from "./TopRestaurants"

export default function TopRestaurantsContainer({restaurantViewLogs}) {
    const [restVisitCountArr, setRestVisitCountArr] = useState([])
    const [numToRender, setNumToRender] = useState(10)
    useEffect(()=>{
                // set to map for performance
                let restIdMap = new Map()
                // console.log("restaurantViewLogs:",restaurantViewLogs)
                restaurantViewLogs.forEach((logItem)=>{
                    const findStr = "/restaurants/"
                    const idLength = 24
                    const startIdx = logItem.endPointURL.indexOf(findStr) + findStr.length 
                    const restId = logItem.endPointURL.substring(startIdx , startIdx + idLength)
                    if(restId.length < 24) return
                    if(restIdMap.has(restId)) {
                        restIdMap.set(restId, restIdMap.get(restId) + 1)
                    } else {
                        restIdMap.set(restId, 1)
                    }
                })
                // console.log("restIdMap:",restIdMap)
                
                const sortedArrFromRestIdMap = Array.from(restIdMap).sort((a,b)=>{return b[1] - a[1]})
                // console.log("sortedArrFromRestIdMap:",sortedArrFromRestIdMap)
                
                let populatedDataArr = []
                sortedArrFromRestIdMap.forEach( async (rest,idx) =>{
                    if(idx >= numToRender) return
                    try {
                        const qRestData = await axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics/restaurant/${rest[0]}`)
                        // console.log("qRestData", qRestData.data)
                        populatedDataArr.push({
                            restId: rest[0],
                            restData: qRestData.data,
                            count: rest[1]
                        })
                        // console.log(`populatedDataArr post push ${idx}`, populatedDataArr)
                    } catch (error) {
                        console.log(error)
                    }
                })  
                // console.log("populatedDataArr All pushed:",populatedDataArr)
                setRestVisitCountArr(populatedDataArr)
    },[restaurantViewLogs])
    return (
    <div>
        <TopRestaurants
            restVisitCountArr={restVisitCountArr}
        />
    </div>
  )
}
