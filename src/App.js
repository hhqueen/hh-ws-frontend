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
// import useGeolocation from "../src/components/customHooks/useGeolocation.js"

// require functions
import dateConverter from "./helperFunctions/dateConverter"
import qStringfromObj from './helperFunctions/qStringfromObj';
import jwtDecode from 'jwt-decode';
import geoForward from './helperFunctions/radarAPI/geofoward';

import geoLocation from "./helperFunctions/geoLocation"
// const dateConverter = require("./helperFunctions/dateConverter")
// const getCoord = require("./helperFunctions/getCoord.js")
// const geoLocation = require("./helperFunctions/geoLocation.js")

// const RestDetail = lazy(() => import('./components/pages/RestDetail'))

const fmtDate = date.format(new Date(), 'dddd')
const Main = lazy(() => import('./components/pages/Main/Main'))
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
  // refactored Variables
  const [allRestaurantsState, setAllRestaurantsState] = useImmer([])
  const [filteredRestaurantsState, setFilteredRestaurantsState] = useImmer([])
  const [coordinatesState, setCoordinatesState] = useImmer({ latitude: 0, longitude: 0 })
  const [distanceState, setDistanceState] = useImmer(5) // in miles?
  const [addressState, setAddressState] = useImmer("")
  const [searchTermState, setSearchTermState] = useImmer("")
  const [showRestaurantsState, setShowRestaurantsState] = useImmer([])

  // variables
  const componentName = "App.js"
  const [navBarHeight, setNavBarHeight] = useState(0)
  const [footerHeight, setFooterHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [mainDivStyle, setMainDivStyle] = useState({})
  const [isFetchingRestData, setIsFetchingRestData] = useState(false)
  // const [geoLocAvail, setGeoLocAvail] = useState(navigator.geolocation)
  // const latLong = useGeolocation(geoLocAvail)
  const [filterParams, setFilterParams] = useImmer(checkboxFilters)
  // const [currentLocation, setCurrentLocation] = useImmer(latLong)
  // const [filteredRestaurants, setFilteredRestaurants] = useState([])
  // const [coordinatesState, setCoordinatesState] = useImmer({latitude: 0, longitude: 0})
  // const [navigatedFlag, setNavigatedFlag] = useState(false)
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


  const filterRestByDay = (filteredRests, dayOweek, hasOnlyLateNightOnDay = false) => {
    const numOweek = dateConverter(dayOweek, false)
    // console.log("numOweek:",numOweek) 
    // console.log("filteredRests:",filteredRests)
    const filterRestsByDay = filteredRests.filter((rest, idx) => {
      //  console.log(`rest${idx}:`, rest)
      const filterFlag = rest.hourSet?.hours.some((e) => {
        let hasHHFilter = e.hasHH1 === true || e.hasHH2 === true || e.isAllDay === true || e.isAllNight === true
        if (hasOnlyLateNightOnDay) { hasHHFilter = e.hasHH2 === true || e.isAllNight === true }
        return e.day === numOweek && hasHHFilter
      })
      // const filterFlag = rest.hourSet.hours
      // console.log(`filterFlag rest${idx}:`, filterFlag)
      return filterFlag
    })
    return filterRestsByDay
  }

  // init 
  useEffect(()=>{
    if(searchParams.address === "") {
      const gotRecentOrCurrentLoc = getMostRecentlySearchedAddress()
      console.log("gotRecentOrCurrentLoc:", gotRecentOrCurrentLoc)
      setAddressState(gotRecentOrCurrentLoc)
      setSearchParams((draft)=>{draft.address = gotRecentOrCurrentLoc})
    }
  },[])

  // Phase 0 useEffect -> takes address value and sets CoordinatesState (with logic), dependencies: [AddressState]
  useEffect(() => {
    const executePhaseZero = async () => {
      try {
        console.log("executing phase 0")
        showRestaurantsState([])
        console.log("addressState:",addressState)
        // if address state is "Current Location" attempt to get current location, else try and get coordinates from position Stack API
        if (addressState === "Current Location") {
          // if geolocation permission is given, get/set coordinates
          if ("geolocation" in navigator) {
            const geoCoords = await geoLocation()
            console.log("geoCoords:",geoCoords)
            setCoordinatesState((draft) => {
              draft.latitude = geoCoords.latitude
              draft.longitude = geoCoords.longitude
            })
          } else {
            // if not, error and prompt for a valid location
            console.log("geolocation permission was not given.")
          }
        }
        if (addressState !== "Current Location" && addressState !== "") {
          // send address to radar geoforward for coordinates
          const foundAddress = await geoForward(addressState)
          // console.log("foundAddress:", foundAddress)
          if (foundAddress.length > 0) {
            // check if the coordinates are valid, if valid, set coordinates
            setCoordinatesState((draft) => {
              draft.latitude = foundAddress[0].latitude
              draft.longitude = foundAddress[0].longitude
            })
          } else {
            // if not
            console.log("there was no coordinates found for the supplied address")
          }
        }
      } catch (error) {

      }
    }
    executePhaseZero()
  }, [addressState, searchTermState])

  // Phase 1 useEffect -> fetchs raw restaurant list, dependencies: [CoordinatesState, DistanceState]
  useEffect(() => {
    const executePhaseOne = async () => {
      setAllRestaurantsState([])
      try {
        console.log("executing phase 1")
        // console.log("coordinatesState:", coordinatesState)
        // console.log("distanceState:", distanceState)
        let queryString = ""
        const queryParams = {
          searchTerm: searchTermState,
          currentLatitude: coordinatesState.latitude,
          currentLongitude: coordinatesState.longitude,
          address: addressState,
          searchButtonClicked: false,
          userId: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).id : null,
          UI_ComponentName: componentName
        }
        queryString = qStringfromObj(queryParams)
        const getString = `${process.env.REACT_APP_SERVER_URL}/restaurants${queryString}`
        const httpMethod = "get"
        const gotRests = await axios[httpMethod](getString)
        console.log("gotRests_V2:", gotRests.data)
        setAllRestaurantsState(gotRests.data)
      } catch (error) {
        console.warn(error)
      }
    }
    executePhaseOne()
  }, [coordinatesState, distanceState])

  // Phase 2 useEffect -> filteres raw restaurant list, dependencies: [AllRestaurantsState, dowState, FilterParamsState,uiFilterState]
  useEffect(() => {
    console.log("executing phase 2")
    setFilteredRestaurantsState([])
    // setShowRestaurantsState([])
    if (allRestaurantsState.length > 0) {
      let filteredRest = []
      // console.log("allRestaurantsState:", allRestaurantsState)
      filteredRest = allRestaurantsState
      filteredRest = filterRestByDay(filteredRest, dow, UIFilters.hasOnlyLateNightOnDay.value /* late night/all night only filter flag here*/)
      filteredRest = filterRests(filterParams, filteredRest)
      // console.log("filteredRest_V2:",filteredRest)
      setFilteredRestaurantsState(filteredRest)
    }
  }, [allRestaurantsState, dow, filterParams, UIFilters])

  // Phase 3 useEffect -> sorts filtered restaurant list, dependencies: [FilteredRestaurantsState]
  useEffect(() => {
    // currently there is no sorting.
    console.log("executing phase 3")
    // console.log("filteredRestaurantsState_v2:", filteredRestaurantsState)
    let sortedRestaurants = filteredRestaurantsState
    // sorting code goes here (WIP)
    setShowRestaurantsState(sortedRestaurants)
  }, [filteredRestaurantsState])



  // tracks and updates the height of the main component responsively
  useEffect(() => {
    const windowHeight = window.innerHeight
    setMainDivStyle({
      minHeight: windowHeight - footerHeight - navBarHeight,
      marginTop: navBarHeight
    })
    setContentHeight(windowHeight - footerHeight - navBarHeight)
  }, [footerHeight, navBarHeight])

  const queryClient = new QueryClient()
  return (

    <QueryClientProvider client={queryClient}>
      <Router>

        <NavBar
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          // handleSearchFormSubmit={handleSearchFormSubmit}
          // geoLocAvail={geoLocAvail}
          setNavBarHeight={setNavBarHeight}
          setAddressState={setAddressState}
          setSearchTermState={setSearchTermState}
        />

        <Routes>
          {/* website routes */}
          <Route
            path='/'
            element={

              <LandingPage
                setSearchParams={setSearchParams}
                // setNavigatedFlag={setNavigatedFlag}
                mainDivStyle={mainDivStyle}
                setAddressState={setAddressState}
              />

            }
          />

          <Route
            path="/restaurants"
            element={
              <Suspense fallback={<LoadingComp />}>
                <Main
                  isFetchingRestData={isFetchingRestData}
                  showRestaurants={showRestaurantsState}
                  // showRestaurants={showRestaurants}
                  setFilterParams={setFilterParams}
                  filterParams={filterParams}
                  setDow={setDow}
                  dow={dow}
                  searchParams={searchParams}
                  coordinatesState={coordinatesState}
                  UIFiltersProps={{ UIFilters, setUIFilters }}
                  // currentLocation={currentLocation}
                  mainDivStyle={mainDivStyle}
                  navBarHeight={navBarHeight}
                />
              </Suspense>
            }
          />

          <Route
            path="/restaurant/:id"
            element={
              <Suspense fallback={<LoadingComp />}>
                <RestDetail
                  mainDivStyle={mainDivStyle}
                />
              </Suspense>
            }
          />

          <Route
            path='/editrestaurant/:id'
            element={
              <Suspense fallback={<LoadingComp />}>
                <AddEditRest
                  // currentLocation={currentLocation}
                  mainDivStyle={mainDivStyle}
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
                  // currentLocation={currentLocation}
                  mainDivStyle={mainDivStyle}
                />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<LoadingComp />}>
                <SignUp
                  mainDivStyle={mainDivStyle}
                />
              </Suspense>
            }
          />

          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingComp />}>
                <Login
                  mainDivStyle={mainDivStyle}
                />
              </Suspense>
            }
          />

        </Routes>

        <Footer
          contentHeight={contentHeight}
          setFooterHeight={setFooterHeight}
        />
      </Router>
    </QueryClientProvider >
  );
}

export default App;
