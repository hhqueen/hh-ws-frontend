// import libraries
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios"
import date from 'date-and-time';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

// import components
import NavBar from "./components/NavBar";
import Main from './components/pages/Main';
import RestDetail from './components/pages/RestDetail';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';

// import source data
import { checkboxFilters } from "./sourceData/filters"

import getCoord from "./helperFunctions/getCoord"
import dateConverter from "./helperFunctions/dateConverter"
import geoLocation from "./helperFunctions/geoLocation"
// require functions
// const dateConverter = require("./helperFunctions/dateConverter")
// const getCoord = require("./helperFunctions/getCoord.js")
// const geoLocation = require("./helperFunctions/geoLocation.js")

function App() {
  // variables
  const [allRestaurants, setAllRestaurants] = useState([])
  const [filterParams, setFilterParams] = useState([])
  const [currentLocation, setCurrentLocation] = useState({})
  // const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [showRestaurants, setShowRestaurants] = useState([])
  const [dow, setDow] = useState("")
  const [locParams, setLocParams] = useState({
    coordinates: {
      lat: null,
      long: null
    },
    location: null
  })

  const now = new Date()
  const fmtDate = date.format(now, 'dddd')

  // restaurant filter function
  const filterRests = (filterArr, restData) => {
    const trueFilters = filterArr.filter(filterParam => filterParam.value)
    const filteredRestaurants = restData.filter((rest) => {
      // console.log(rest)  
      for (let i = 0; i < trueFilters.length; i++) {
        // console.log(rest[trueFilters[i].name])
        if (!rest[trueFilters[i].name]) {
          return false
        }
      }
      return true
    })
    // console.log("filteredRestaurants", filteredRestaurants)
    return filteredRestaurants
  }

  // API call to backend for all restaurant data. 
  // need to be filtered on server side based on location distance
  const getRestaurants = async () => {
    try {
      // console.log(filterObj)   
      const gotRests = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants`)
      return gotRests.data
    } catch (error) {
      console.warn(error)
    }
  }

  // filter submit hander (filter apply)
  const filterFormSubmitHandler = async (e) => {
    e.preventDefault()
    const filteredRests = filterRests(filterParams, allRestaurants)
    // console.log(filteredRests)

    const numOweek = dateConverter(dow, false)
    const filterRestsByDay = filteredRests.filter((rest) => {
      const filterFlag = rest.hours.some((e) => e.day === numOweek && (e.hasHH1 === true || e.hasHH2 === true))
      console.log(filterFlag)
      return filterFlag
    })
    // setShowRestaurants(filteredRests)
    setShowRestaurants(filterRestsByDay)
  }

  const filterRestByDay = (filteredRests, dayOweek) => {
    const numOweek = dateConverter(dayOweek, false)
    const filterRestsByDay = filteredRests.filter((rest) => {
      const filterFlag = rest.hours.some((e) => e.day === numOweek && (e.hasHH1 === true || e.hasHH2 === true))
      console.log(filterFlag)
      return filterFlag
    })
    return filterRestsByDay
  }

  // initial loading of data
  useEffect(() => {
    const loadInitialData = async () => {
      const allRests = await getRestaurants()
      setAllRestaurants(allRests)
      const restArrByDay = filterRestByDay(allRests, fmtDate)
      setShowRestaurants(restArrByDay)

      const coords = await getCoord("1281 Westreef, Costa Mesa, CA")
      console.log(coords)

      const latLong = geoLocation()
      console.log(latLong)

      setLocParams({ ...locParams, ...locParams.coordinates.lat = latLong.latitude })

    }
    loadInitialData()
    setDow(fmtDate)
    setFilterParams(checkboxFilters)

  }, [])

  useEffect(() => {
    return console.log("dow", dow)
  })

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client = {queryClient}>
      <Router>

        <NavBar />

        <Routes>
          {/* website routes */}
          <Route
            path="/"
            element={<Main
              allRestaurants={showRestaurants}
              setFilterParams={setFilterParams}
              filterParams={filterParams}
              filterFormSubmitHandler={filterFormSubmitHandler}
              setDow={setDow}
              dow={dow}
            />}
          />

          <Route
            path="/restaurant/:id"
            element={<RestDetail />}
          />

          {/* <Route
          path="/account"
          element={<RestDetail/>}
        /> */}

          <Route
            path="/signup"
            element={<SignUp />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;