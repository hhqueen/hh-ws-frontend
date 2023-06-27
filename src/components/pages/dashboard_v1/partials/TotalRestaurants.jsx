import React, {useState, useEffect} from 'react'
import axios from 'axios'
import LoadingComp from '../../../Shared/LoadingComp'

export default function TotalRestaurants({passedRestTotalNum, }) {
    // const [totalNum, setTotalNum] = useState(passedRestTotalNum)
    // const [isFetching, setIsFetching] = useState(true)

    // useEffect(()=>{
    //     async function fetchNum(){
    //         setIsFetching(true)
    //         const fetchedNum = await axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics/totalNumberOfRestaurants`) 
    //         setTotalNum(fetchedNum.data)
    //         setIsFetching(false)
    //     }
    //     fetchNum()
    // },[])
  return (
    <div>
        <p>Total Happy Hours: {passedRestTotalNum}</p>
    </div>
  )
}
