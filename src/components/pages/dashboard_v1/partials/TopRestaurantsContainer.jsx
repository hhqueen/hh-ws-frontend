import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import TopRestaurants from "./TopRestaurants"

export default function TopRestaurantsContainer({}) {
    const [restVisitCountArr, setRestVisitCountArr] = useState([])
    const [numToRender, setNumToRender] = useState(10)
    const [errorMsg , setErrorMsg] = useState(null)
    
    const navigate = useNavigate()

    const onRowClick = (id) => {
        navigate(`/restaurant/${id}`)
    }

    useEffect(()=>{
        const getRestVisits = async () =>{
            try {
                const gotRestVisits = await axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics/RestaurantVisits`)
                
                console.log("gotRestVisits:", gotRestVisits.data)
                let topNumRest = []
                for(let i=0; i < numToRender; i++) {
                    // console.log(`gotRestVisits.data[${i}]`, gotRestVisits.data[i])
                    topNumRest.push(gotRestVisits.data[i])
                }
                console.log(topNumRest)
                setRestVisitCountArr(topNumRest)
            } catch (error) {
                console.log(error)
                setErrorMsg(error)
            }
        }
        getRestVisits()
    },[])

    return (
        <div>
            <TopRestaurants
                restVisitCountArr={restVisitCountArr}
                errorMsg={errorMsg}
                onRowClick={onRowClick}
            />
        </div>
    )
}
