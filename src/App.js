// import libraries
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { useState, useEffect, Suspense, lazy } from 'react';
import axios from "axios"
import date from 'date-and-time';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import jwt_decode from 'jwt-decode';
import {useImmer} from "use-immer"

// import components
import NavBar from "./components/NavBar";
import Main from './components/pages/Main';
import RestDetail from './components/pages/RestDetail';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import AddEditRest from "./components/pages/AddEditRest"
import LoadingComp from './components/LoadingComp';
import ModalTest from './components/pages/ModalTest';

// import source data
import { checkboxFilters } from "./sourceData/emptyDataTemplates"

// require functions
import getCoord from "./helperFunctions/getCoord"
import dateConverter from "./helperFunctions/dateConverter"
import geoLocation from "./helperFunctions/geoLocation"
// const dateConverter = require("./helperFunctions/dateConverter")
// const getCoord = require("./helperFunctions/getCoord.js")
// const geoLocation = require("./helperFunctions/geoLocation.js")
// const Main = lazy(() => import('./components/pages/Main'))
// const RestDetail = lazy(() => import('./components/pages/RestDetail'))

const fmtDate = date.format(new Date(), 'dddd')

function App() {
  // variables
  const [allRestaurants, setAllRestaurants] = useState([])
  const [filterParams, setFilterParams] = useImmer(checkboxFilters)
  const [currentLocation, setCurrentLocation] = useImmer({
    latitude:null,
    longitude:null
  })
  // const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [showRestaurants, setShowRestaurants] = useState([])
  const [dow, setDow] = useState(fmtDate)
  const [searchParams, setSearchParams] = useImmer({
    searchTerm:"",
    currentLatitude: null,
    currentLongitude: null,
    address: "",
    searchButtonClicked: false
  })  

  // restaurant filter function
  const filterRests = (filterArr, restData) => {
    const trueFilters = filterArr.filter(filterParam => filterParam.value)
    const filteredRestaurants = restData.filter((rest) => {
      // console.log(rest)  
      for (let i = 0; i < trueFilters.length; i++) {
        // console.log(rest[trueFilters[i].name])
        if (!rest.filterParams[trueFilters[i].name]) {
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
    let queryString = "?"
    console.log("filterParams:", filterParams)
    
    // Build Query String
    Object.entries(searchParams).map((param,idx)=>{
      if (queryString !== "?") {
        queryString += "&"
      }
      queryString += `${param[0]}=${param[1]}`
    })

    filterParams.forEach((param)=>{
      if (param.value === true) {
        queryString += `&${param.name}=${true}`
      }
    })
    console.log("queryString:",queryString)

    // Execute API Query based on state filters and search values
    try {
      // console.log(filterObj)   
      const gotRests = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants${queryString}`)
      return gotRests.data
    } catch (error) {
      console.warn(error)
    }
  }

  const filterRestByDay = (filteredRests, dayOweek) => {
    const numOweek = dateConverter(dayOweek, false)
    const filterRestsByDay = filteredRests.filter((rest) => {
      const filterFlag = rest.hourSet?.hours.some((e) => e.day === numOweek && (e.hasHH1 === true || e.hasHH2 === true))
      console.log(filterFlag)
      return filterFlag
    })
    return filterRestsByDay
  }

  // initial loading of data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await geoLocationSetter()
        const allRests = await getRestaurants()
        setAllRestaurants(allRests)
        setShowRestaurants(await filterRestByDay(allRests, dow))
      } catch (error) {
        console.warn(error)
      }
    }
    loadInitialData()
  }, [])

  const geoLocationSetter = async () => {
    try {
      const latLong = await geoLocation()
      console.log("latLong:",latLong)
      await setCurrentLocation((draft)=>{
        draft.latitude = latLong.latitude
        draft.longitude = latLong.longitude
      })
      await setSearchParams((draft)=>{
        draft.currentLatitude = latLong.latitude
        draft.currentLongitude = latLong.longitude  
    })
    } catch (error) {
      console.warn(error)
    }
  }
  
  const handleSearchFormSubmit = async (e) =>{
    // e.preventDefault()
    try {
      console.log("handleSearchFormSubmit submitted")
      const gotRests = getRestaurants()
    } catch (error) {
      console.log(error)
    }
  }

  // re-render list on filterParams Change. may want to change this to a server call. 
  useEffect(()=>{
        const filteredRests = filterRests(filterParams, allRestaurants)   
        const numOweek = dateConverter(dow, false)
        const filterRestsByDay = filteredRests.filter((rest) => {
          const filterFlag = rest.hourSet?.hours.some((e) => e.day === numOweek && (e.hasHH1 === true || e.hasHH2 === true))
          console.log(filterFlag)
          return filterFlag
        })
        setShowRestaurants(filterRestsByDay)
  },[filterParams])

  // useEffect(() => {
  //   return console.log("dow", dow)
  // })

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>

        <NavBar 
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          handleSearchFormSubmit={handleSearchFormSubmit}
        />
        
          <Routes>
            {/* website routes */}
            <Route
              path="/"
              element={<Main
                allRestaurants={showRestaurants}
                setFilterParams={setFilterParams}
                filterParams={filterParams}
                setDow={setDow}
                dow={dow}
              />}
            />

            <Route
              path="/restaurant/:id"
              element={<RestDetail />}
            />

            <Route
              path='/editrestaurant/:id'
              element={<AddEditRest 
                currentLocation={currentLocation}
              />}
            />


            {/* <Route
          path="/account"
          element={<RestDetail/>}
        /> */}

            <Route
              path="/addnewrestaurant"
              element={<AddEditRest 
                currentLocation={currentLocation}
              />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/modalTest"
              element={<ModalTest />}
            />        

          </Routes>
        
      </Router>
    </QueryClientProvider>
  );
}

export default App;
