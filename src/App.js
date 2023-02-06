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
import { useImmer } from "use-immer"

// import components
import LoadingComp from './components/LoadingComp';
import Footer from './components/Footer';

// import source data
import { checkboxFilters } from "./sourceData/emptyDataTemplates"

// import Custom Hoosk
import useGeolocation from "../src/components/customHooks/useGeolocation.js"

// require functions
import dateConverter from "./helperFunctions/dateConverter"
import qStringfromObj from './helperFunctions/qStringfromObj';
import jwtDecode from 'jwt-decode';

// import geoLocation from "./helperFunctions/geoLocation"
// const dateConverter = require("./helperFunctions/dateConverter")
// const getCoord = require("./helperFunctions/getCoord.js")
// const geoLocation = require("./helperFunctions/geoLocation.js")

// const RestDetail = lazy(() => import('./components/pages/RestDetail'))

const fmtDate = date.format(new Date(), 'dddd')
const Main = lazy(() => import('./components/pages/Main'))
// import Main from './components/pages/Main';
const AddEditRest = lazy(() => import('./components/pages/AddEditRest'))
// import AddEditRest from "./components/pages/AddEditRest"
const RestDetail = lazy(() => import('./components/pages/RestDetail'))
// import RestDetail from './components/pages/RestDetail';
const NavBar = lazy(() => import('./components/NavBar'))
// import NavBar from "./components/NavBar";
const SignUp = lazy(() => import('./components/pages/SignUp'))
// import SignUp from './components/pages/SignUp';
const Login = lazy(() => import('./components/pages/Login'))
// import Login from './components/pages/Login';

const LandingPage = lazy(() => import('./components/pages/LandingPage/LandingPage'))



// get recent search address
const getMostRecentlySearchedAddress = () => {

  if (localStorage.getItem('sh')) {
    const getHistoryArr = JSON.parse(localStorage.getItem('sh'))
    const mostRecentVal = getHistoryArr.length - 1
    // setSearchParams((draft) => { draft.address = getHistoryArr[mostRecentVal].address })
    // console.log(navigator.geolocation)
    if (!localStorage.getItem('sh') && navigator.geolocation) {
      return "Current Location"
    } else {
      return getHistoryArr[mostRecentVal].address
    }
  } else {
    return ""
  }
}

function App() {
  // variables
  const componentName = "App.js"
  const [isFetchingRestData, setIsFetchingRestData] = useState(false)
  const [geoLocAvail, setGeoLocAvail] = useState(navigator.geolocation)
  const latLong = useGeolocation(geoLocAvail)
  // console.log("useGeolocation latLong:",latLong)
  const [allRestaurants, setAllRestaurants] = useState([])
  const [filterParams, setFilterParams] = useImmer(checkboxFilters)
  const [currentLocation, setCurrentLocation] = useImmer(latLong)
  // const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [showRestaurants, setShowRestaurants] = useState([])
  const [navigatedFlag, setNavigatedFlag] = useState(false)
  const [dow, setDow] = useState(fmtDate)
  const [searchParams, setSearchParams] = useImmer({
    searchTerm: "",
    currentLatitude: null,
    currentLongitude: null,
    address: "",
    searchButtonClicked: false
  })

  const [UIFilters, setUIFilters] = useImmer({
    hasOnlyLateNightOnDay: {
      name: "hasOnlyLateNightOnDay", 
      displayName: "Late Night",
      value: false
    }
  })


  // console.log(searchParams)
  // restaurant filter function
  const filterRests = (filterArr, restData) => {
    // console.log("filterArr:", filterArr)
    const trueFilters = filterArr.filter(filterParam => filterParam.value)
    // console.log("trueFilters:", trueFilters)
    const filteredRestaurants = restData.filter((rest) => {
      // console.log("rest:", rest)
      for (let i = 0; i < trueFilters.length; i++) {
        // console.log("rest[trueFilters[i].name]:",rest.filterParams.name === [trueFilters[i].name])
        // if (!rest.filterParams.name === [trueFilters[i].name]) {
        //   return false
        // }
        const foundParam = rest.filterParams.find(({ name, value }) => name === trueFilters[i].name && value === true)
        // console.log("foundParam:", foundParam)
        if (!foundParam) return false
      }
      return true
    })
    // console.log("filteredRestaurants", filteredRestaurants)
    return filteredRestaurants
  }

  // API call to backend for all restaurant data. 
  // need to be filtered on server side based on location distance
  const getRestaurants = async () => {
    // console.log("getRestaurants_latLong:", latLong)
    try {
      setAllRestaurants([])
      setShowRestaurants([])
      let queryString = "?"
      const revisedSearchParams = {
        searchTerm: searchParams.searchTerm,
        currentLatitude: latLong.latitude,
        currentLongitude: latLong.longitude,
        address: searchParams.address,
        searchButtonClicked: false,
        userId: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).id : null,
        UI_ComponentName: componentName 
      }
      // console.log("revisedSearchParams:", revisedSearchParams)

      // Build Query String
      queryString = qStringfromObj(revisedSearchParams)
      // console.log("app.js_queryString:",queryString)
      filterParams.forEach((param) => {
        if (param.value === true) {
          queryString += `&${param.name}=${true}`
        }
      })
      const getString = `${process.env.REACT_APP_SERVER_URL}/restaurants${queryString}`
      // console.log("process.env.REACT_APP_SERVER_URL:",process.env.REACT_APP_SERVER_URL)
      // console.log("getString:",getString)
      // const gotRests = await axios.get(getString)
      const httpMethod = "get"
      const gotRests = await axios[httpMethod](getString)
      setIsFetchingRestData(false)
      return gotRests.data
    } catch (error) {
      console.warn(error)
    }
  }

  const filterRestByDay = (filteredRests, dayOweek, hasOnlyLateNightOnDay = false) => {
    const numOweek = dateConverter(dayOweek, false)
    // console.log("numOweek:",numOweek) 
    // console.log("filteredRests:",filteredRests)
    const filterRestsByDay = filteredRests.filter((rest,idx) => {
      //  console.log(`rest${idx}:`, rest)
      const filterFlag = rest.hourSet?.hours.some((e) => {
        let hasHHFilter = e.hasHH1 === true || e.hasHH2 === true || e.isAllDay  === true || e.isAllNight === true 
        if (hasOnlyLateNightOnDay) { hasHHFilter = e.hasHH2 === true || e.isAllNight === true }
        return e.day === numOweek && hasHHFilter
      })
      // const filterFlag = rest.hourSet.hours
      // console.log(`filterFlag rest${idx}:`, filterFlag)
      return filterFlag
    })
    return filterRestsByDay
  }

  const getAndShowFilteredRestaurants = async () => {
    try {
      const allRests = await getRestaurants()
      setAllRestaurants(allRests)
      const filteredRestsByDay = filterRestByDay(allRests, dow, UIFilters.hasOnlyLateNightOnDay.value /* late night/all night only filter flag here*/)
      const filteredRestbyFilterParams = filterRests(filterParams, filteredRestsByDay)
      setShowRestaurants(filteredRestbyFilterParams)
    } catch (error) {
      console.warn(error)
    }

  }

  const handleSearchFormSubmit = async (e) => {
    // e.preventDefault()
    try {
      await getAndShowFilteredRestaurants()
    } catch (error) {
      console.log(error)
    }
  }

  const loadInitialData = async () => {
    try {
      setIsFetchingRestData(true)
      await getAndShowFilteredRestaurants()
    } catch (error) {
      console.warn(error)
    }
  }

  const setGeolocations = () => {
    setCurrentLocation((draft) => {
      draft.latitude = latLong.latitude
      draft.longitude = latLong.longitude
    })
    setSearchParams((draft) => {
      draft.currentLatitude = latLong.latitude
      draft.currentLongitude = latLong.longitude
    })
  }

  // initial loading of data
  useEffect(() => {
    loadInitialData()
    setGeolocations()
    if (navigatedFlag) setNavigatedFlag(false)

  }, [latLong, dow, filterParams, navigatedFlag, UIFilters])

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>

        <NavBar
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          handleSearchFormSubmit={handleSearchFormSubmit}
          geoLocAvail={geoLocAvail}
        />

        <Routes>
          {/* website routes */}
          <Route
            path='/'
            element={

                <LandingPage
                  setSearchParams={setSearchParams}
                  setNavigatedFlag={setNavigatedFlag}
                />

            }
          />

          <Route
            path="/restaurants"
            element={
              <Suspense fallback={<LoadingComp />}>
                <Main
                  isFetchingRestData={isFetchingRestData}
                  allRestaurants={showRestaurants}
                  setFilterParams={setFilterParams}
                  filterParams={filterParams}
                  setDow={setDow}
                  dow={dow}
                  searchParams={searchParams}
                  UIFiltersProps={{UIFilters, setUIFilters}}
                  currentLocation={currentLocation}
                />
              </Suspense>
            }
          />

          <Route
            path="/restaurant/:id"
            element={
              <Suspense fallback={<LoadingComp />}>
                <RestDetail />
              </Suspense>
            }
          />

          <Route
            path='/editrestaurant/:id'
            element={
              <Suspense fallback={<LoadingComp />}>
                <AddEditRest
                  currentLocation={currentLocation}
                />
              </Suspense>
            }
          />


          {/* <Route
          path="/account"
          element={<RestDetail/>}
        /> */}

          < Route
            path="/addnewrestaurant"
            element={
              <Suspense fallback={<LoadingComp />}>
                <AddEditRest
                  currentLocation={currentLocation}
                />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<LoadingComp />}>
                <SignUp />
              </Suspense>
            }
          />

          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingComp />}>
                <Login />
              </Suspense>
            }
          />

        </Routes>

      <Footer/>
      </Router>
    </QueryClientProvider >
  );
}

export default App;
