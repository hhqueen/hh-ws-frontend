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

// import source data
import { checkboxFilters } from "./sourceData/emptyDataTemplates"

// import Custom Hoosk
import useGeolocation from "../src/components/customHooks/useGeolocation.js"

// require functions
import dateConverter from "./helperFunctions/dateConverter"
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



// get recent search address
const getMostRecentlySearchedAddress = () => {
  if (localStorage.getItem('sh')){
      const getHistoryArr = JSON.parse(localStorage.getItem('sh'))
      const mostRecentVal = getHistoryArr.length - 1
      // setSearchParams((draft) => { draft.address = getHistoryArr[mostRecentVal].address })
      return getHistoryArr[mostRecentVal].address
  } else {
    return ""
  }
}

function App() {
  // variables
  const [isFetchingRestData , setIsFetchingRestData] = useState(false)
  const [geoLocAvail, setGeoLocAvail] = useState(navigator.geolocation)
  const latLong = useGeolocation(geoLocAvail)
  // console.log("useGeolocation latLong:",latLong)
  const [allRestaurants, setAllRestaurants] = useState([])
  const [filterParams, setFilterParams] = useImmer(checkboxFilters)
  const [currentLocation, setCurrentLocation] = useImmer(latLong)
  // const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [showRestaurants, setShowRestaurants] = useState([])
  const [dow, setDow] = useState(fmtDate)
  const [searchParams, setSearchParams] = useImmer({
    searchTerm: "",
    currentLatitude: null,
    currentLongitude: null,
    address: getMostRecentlySearchedAddress(),
    searchButtonClicked: false
  })


  // console.log(searchParams)
  // restaurant filter function
  const filterRests = (filterArr, restData) => {
    console.log("filterArr:",filterArr)
    const trueFilters = filterArr.filter(filterParam => filterParam.value)
    console.log("trueFilters:",trueFilters)
    const filteredRestaurants = restData.filter((rest) => {
      console.log("rest:",rest)  
      for (let i = 0; i < trueFilters.length; i++) {
        // console.log("rest[trueFilters[i].name]:",rest.filterParams.name === [trueFilters[i].name])
        // if (!rest.filterParams.name === [trueFilters[i].name]) {
        //   return false
        // }
        const foundParam = rest.filterParams.find(({name, value}) => name === trueFilters[i].name && value === true )
        console.log("foundParam:",foundParam)
        if (!foundParam) return false
      }
      return true
    })
    console.log("filteredRestaurants", filteredRestaurants)
    return filteredRestaurants
  }

  // API call to backend for all restaurant data. 
  // need to be filtered on server side based on location distance
  const getRestaurants = async () => {
    console.log("getRestaurants_latLong:",latLong)
    try {
      setAllRestaurants([])
      setShowRestaurants([])
      let queryString = "?"
      // console.log("filterParams:", filterParams)

      // const latLong = await geoLocation()
      // console.log("latLong_getrestaraunts:", latLong)

      const revisedSearchParams = {
        searchTerm: "",
        currentLatitude: latLong.latitude,
        currentLongitude: latLong.longitude,
        address: searchParams.address,
        searchButtonClicked: false
      }
      console.log("revisedSearchParams:",revisedSearchParams)

      // Build Query String
      Object.entries(revisedSearchParams).map((param) => {
        if (queryString !== "?") {
          queryString += "&"
        }
        queryString += `${param[0]}=${param[1]}`
      })

      filterParams.forEach((param) => {
        if (param.value === true) {
          queryString += `&${param.name}=${true}`
        }
      })
      console.log("queryString:", queryString)
      // console.log(filterObj)   
      // Execute API Query based on state filters and search values
      const gotRests = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants${queryString}`)
      setIsFetchingRestData(false)
      return gotRests.data
    } catch (error) {
      console.warn(error)
    }
  }

  const filterRestByDay = (filteredRests, dayOweek) => {
    const numOweek = dateConverter(dayOweek, false)
    // console.log("numOweek:",numOweek)
    // console.log("filteredRests:",filteredRests)
    const filterRestsByDay = filteredRests.filter((rest,idx) => {
      console.log(`rest${idx}:`, rest)
      const filterFlag = rest.hourSet?.hours.some((e) => e.day === numOweek && (e.hasHH1 === true || e.hasHH2 === true))
      // const filterFlag = rest.hourSet.hours
      console.log(`filterFlag rest${idx}:`,filterFlag)
      return filterFlag
    })
    return filterRestsByDay
  }

  const handleSearchFormSubmit = async (e) => {
    // e.preventDefault()
    try {
      console.log("handleSearchFormSubmit submitted")
      setIsFetchingRestData(true)
      const gotRests = await getRestaurants()
      console.log("gotRests:", gotRests)
      setAllRestaurants(gotRests)
      setShowRestaurants(await filterRestByDay(gotRests, dow))
    } catch (error) {
      console.log(error)
    }
  }


  // initial loading of data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsFetchingRestData(true)
        const allRests = await getRestaurants()
        setAllRestaurants(allRests)
        const filteredRestsByDay = filterRestByDay(allRests, dow)
        const filteredRestbyFilterParams = filterRests(filterParams, filteredRestsByDay)
        setShowRestaurants(filteredRestbyFilterParams)
      } catch (error) {
        console.warn(error)
      }
    }
    loadInitialData()
    setCurrentLocation((draft)=>{
      draft.latitude = latLong.latitude
      draft.longitude = latLong.longitude
    })
  }, [latLong, dow])

    // re-render list on filterParams Change. may want to change this to a server call. 
    useEffect(() => {
      const filterRestsByDay = filterRestByDay(allRestaurants, dow)
      const filteredRests = filterRests(filterParams, filterRestsByDay)
      setShowRestaurants(filteredRests)
    }, [filterParams])







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
            element={
              <Suspense fallback={<LoadingComp />}>
                <Main
                isFetchingRestData={isFetchingRestData}
                  allRestaurants={showRestaurants}
                  setFilterParams={setFilterParams}
                  filterParams={filterParams}
                  setDow={setDow}
                  dow={dow}
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

      </Router>
    </QueryClientProvider >
  );
}

export default App;
