import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TopRestaurants from "./TopRestaurants"

export default function TopRestaurantsContainer({ pageVisitData }) {
    const [restVisitCountArr, setRestVisitCountArr] = useState([])
    const [numToRender, setNumToRender] = useState(10)
    const [errorMsg, setErrorMsg] = useState(null)

    const navigate = useNavigate()

    const onRowClick = (id) => {
        navigate(`/restaurant/${id}`)
    }

    useEffect(() => {
        let topNumRest = []
        for (let i = 0; i < numToRender; i++) {
            topNumRest.push(pageVisitData[i])
        }
        setRestVisitCountArr(topNumRest)
    }, [pageVisitData, numToRender])

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
