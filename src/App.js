// import libraries
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { useState, useEffect, useLayoutEffect, Suspense, lazy, useMemo, useTransition, useReducer, useCallback } from 'react'
import axios from "axios"
import date from 'date-and-time';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useImmer } from "use-immer"
import { useMediaQuery } from 'react-responsive'

// import components
import LoadingComp from './components/Shared/LoadingComp';
import Footer from './components/Shared/Footer/Footer';

// import source data
import { checkboxFilters } from "./sourceData/emptyDataTemplates"

// import Custom Hoosk
// import useGeolocation from "../src/components/customHooks/useGeolocation.js"

// require functions
import qStringfromObj from './helperFunctions/qStringfromObj';
import jwtDecode from 'jwt-decode';
import geoForward from './helperFunctions/radarAPI/geofoward';

import geoLocation from "./helperFunctions/geoLocation"


// const getCoord = require("./helperFunctions/getCoord.js")
// const geoLocation = require("./helperFunctions/geoLocation.js")

// const RestDetail = lazy(() => import('./components/pages/RestDetail'))

// Context
import { GlobalStateContext } from './components/context/GlobalStateContext';


const Main = lazy(() => import('./components/pages/Main/Main'))
// import Main from './components/pages/Main';
const AddEditRest = lazy(() => import('./components/pages/AddEditRest'))
// import AddEditRest from "./components/pages/AddEditRest"
const RestDetail = lazy(() => import('./components/pages/RestDetail/RestDetail'))
// import RestDetail from './components/pages/RestDetail';

const NavBarContainer = lazy(() => import('./components/Shared/NavBar/NavBarContainer'))
// import NavBar from "./components/NavBar";

const SignUp = lazy(() => import('./components/pages/SignUp'))
// import SignUp from './components/pages/SignUp';
const Login = lazy(() => import('./components/pages/Login'))
// import Login from './components/pages/Login';
const Profile = lazy(() => import('./components/pages/ProfileSettings/ProfileContainer'))
const LandingPage = lazy(() => import('./components/pages/LandingPage/LandingPage'))
// const DashBoard = lazy(() => import('./components/pages/dashboard/DashBoard'))
const DashBoardContainer = lazy(() => import('./components/pages/dashboard_v1/DashBoardContainer'))
// import Login from './components/pages/Login';

// require functions
const { dc_StrToNum } = require("./helperFunctions/dowConv")
const { deepCopyObj } = require("./helperFunctions/deepCopy")
// const fmtDate = date.format(new Date(), 'dddd')




function App() {
  // refactored Variables
  const [allRestaurantsState, setAllRestaurantsState] = useImmer([])
  const [filteredRestaurantsState, setFilteredRestaurantsState] = useImmer([])
  const [coordinatesState, setCoordinatesState] = useImmer({ latitude: 0, longitude: 0 })
  const [distanceState, setDistanceState] = useImmer(5) // in miles?
  const [addressState, setAddressState] = useImmer("")
  const [searchTermState, setSearchTermState] = useImmer("")
  const [restIdxHover, setRestIdxHover] = useState(-1)
  const [showRestaurantsState, setShowRestaurantsState] = useImmer([])
  const [globalContextVar, setGlobalContextVar] = useImmer({
    dow: null,
    coordinatesState: {
      latitude: 0,
      longitude: 0
    },
    geoLocationPermission: null,
    isMobile: null
  })

  // 
  const [gmapBoxState, setGmapBoxState] = useImmer({})
  const [searchOnMapMove, setSearchOnMapMove] = useState(false)

  // variables
  const [showMap, setShowMap] = useState(false)
  const componentName = "App.js"
  const [navBarHeight, setNavBarHeight] = useState(0)
  const [footerHeight, setFooterHeight] = useState(0)
  const [contentHeight, setContentHeight] = useState(0)
  const [mainDivStyle, setMainDivStyle] = useState({})
  const [isFetchingRestData, setIsFetchingRestData] = useState(false)
  const [filterParams, setFilterParams] = useImmer(checkboxFilters)
  const [dow, setDow] = useState(date.format(new Date(), 'dddd'))
  const [searchParams, setSearchParams] = useImmer({
    searchTerm: "",
    currentLatitude: null,
    currentLongitude: null,
    address: "",
    searchButtonClicked: false
  })
  const [searchRadius, setSearchRadius] = useImmer({
    distance: 5,
    UOM: "mi"
  })

  const [UIFilters, setUIFilters] = useImmer({
    hasOnlyLateNightOnDay: {
      name: "hasOnlyLateNightOnDay",
      displayName: "Late Night",
      value: false
    }
  })


  const [restListErrorMsg, setRestListErrorMsg] = useState("")

  const [screenSize, setScreenSize] = useImmer({
    component: {
      navBarHeight: 0,
      footerHeight: 0
    },
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  })


  // hook Variables
  const [isPendingTransition, startTransition] = useTransition()

  const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })


  // restaurant filter function
  const filterRests = useCallback((filterArr, restData) => {
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
  }, [])


  const filterRestByDay = useCallback((filteredRests, dayOweek, hasOnlyLateNightOnDay = false) => {
    const numOweek = dc_StrToNum(dayOweek)
    // console.log("numOweek:", numOweek)
    // console.log("filteredRests:",filteredRests)
    const filterRestsByDay = filteredRests.filter((rest, idx) => {
      //  console.log(`rest${idx}:`, rest)
      const filterFlag = rest.hourSet?.hours.some((e) => {
        let hasHHFilter = e.hasHH1 === true || e.hasHH2 === true || e.isAllDay === true || e.isAllNight === true

        // late night filter logic
        if (hasOnlyLateNightOnDay) {
          hasHHFilter = e.hasHH2 === true || e.isAllNight === true || e.isAllDay === true
            || e.end1close === true /* added this filter per bug# 71 */
        }
        return e.day === numOweek && hasHHFilter
      })
      // const filterFlag = rest.hourSet.hours
      // console.log(`filterFlag rest${idx}:`, filterFlag)
      return filterFlag
    })
    return filterRestsByDay
  }, [])

  // useMemos?
  const focusedRestIdx = useMemo(() => (restIdxHover), [restIdxHover])

  // set global context variable
  useLayoutEffect(() => {
    setGlobalContextVar(draft => {
      draft.dow = dow
      draft.coordinatesState = coordinatesState
      draft.isMobile = !isTWmd
      // draft.geoLocationPermission = 
    })
    // console.log("globalContextVar:",globalContextVar)
  }, [dow, coordinatesState, isTWmd])
  //, [dow, coordinatesState, isTWmd]

  // set Screen Size
  // useEffect(() => {

  //   const setScreenSize = () => {
  //     let timeoutId = null

  //     clearTimeout(timeoutId)
  //     timeoutId = setTimeout(
  //       // startTransition(()=>{
  //       setScreenSize((draft) => {
  //         draft.screenHeight = window.innerHeight
  //         draft.screenWidth = window.innerWidth
  //         // })
  //       }), 150)
  //   }
  //   window.addEventListener("resize", setScreenSize)
  //   return () => {
  //     window.removeEventListener("resize", setScreenSize)
  //   }
  // }, [])


  // init 
  useLayoutEffect(() => {
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

    if (searchParams.address === "" || addressState === "" || searchParams.address !== addressState) {
      const gotRecentOrCurrentLoc = getMostRecentlySearchedAddress()
      console.log("gotRecentOrCurrentLoc:", gotRecentOrCurrentLoc)
      setAddressState(gotRecentOrCurrentLoc)
      setSearchParams((draft) => { draft.address = gotRecentOrCurrentLoc })
    }
  }, [])


  // Phase 0 useEffect -> takes address value and sets CoordinatesState (with logic), dependencies: [searchTermState,AddressState]
  useLayoutEffect(() => {
    const executePhaseZero = async () => {
      // functions
      const setCoordinateStateTransition = (source) => {
        startTransition(() => {
          setCoordinatesState((draft) => {
            draft.latitude = source.latitude
            draft.longitude = source.longitude
          })
        })
      }

      try {
        setIsFetchingRestData(true)
        console.log("executing phase 0")
        // setShowRestaurantsState([])
        console.log("addressState:", addressState)
        // if address state is "Current Location" attempt to get current location, else try and get coordinates from position Stack API


        let geoCoords
        if ("geolocation" in navigator) {
          geoCoords = await geoLocation()
          // if (geoCoords.permission) {
          setGlobalContextVar(draft => { 
            draft.geoLocationPermission = geoCoords.permission
            draft.currentLocationState = {latitude: geoCoords.latitude, longitude: geoCoords.longitude}
          })
          // }

        } else {
          // if not, error and prompt for a valid location
          console.log("geolocation permission was not given.")
        }

        // if geolocation permission is given and addressState is "Current Location", get/set coordinates
        if (addressState.toLowerCase() === "current location") {
          console.log("addressState:", addressState)
          console.log("setting Coordinate State:", geoCoords)
          setCoordinateStateTransition(geoCoords)
        }

        if (addressState.toLowerCase() !== "current location" && addressState !== "") {
          // send address to radar geoforward for coordinates
          const foundAddress = await geoForward(addressState)
          // console.log("foundAddress:", foundAddress)
          if (foundAddress.length > 0) {
            console.log("addressState:", addressState)
            console.log("setting Coordinate State:", foundAddress[0])
            setCoordinateStateTransition(foundAddress[0])
          } else {
            // if not
            console.log("there was no coordinates found for the supplied address")
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (addressState !== "") {
      executePhaseZero()
    }
  }, [addressState])


  const getRestaurantsQuery = async () => {
    let queryString = ""
    let queryParams = {
      searchTerm: searchTermState,
      currentLatitude: coordinatesState.latitude,
      currentLongitude: coordinatesState.longitude,
      distance: searchRadius.distance,
      UOM: searchRadius.UOM,
      address: addressState,
      searchButtonClicked: false,
      userId: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).id : null,
      UI_ComponentName: componentName,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      searchOnMapMove,
      gmapBoxState: JSON.stringify(gmapBoxState)
    }
    // queryParams = {...queryParams, ...searchOnMapMove, ...gmapBoxState}
    console.warn("queryParams:", queryParams)
    queryString = qStringfromObj(queryParams)
    console.log("built queryString:", queryString)
    const getString = `${process.env.REACT_APP_SERVER_URL}/restaurants${queryString}`
    const httpMethod = "get"
    const gotRests = await axios[httpMethod](getString)
    return gotRests
  }
  // Phase 1 useEffect -> fetchs raw restaurant list, dependencies: [CoordinatesState, DistanceState, searchTermState]
  useLayoutEffect(() => {
    const executePhaseOne = async () => {
      try {
        // showRestaurantsState([])
        setIsFetchingRestData(true)
        console.log("executing phase 1")
        // setRestListErrorMsg("")
        const gotRests = await getRestaurantsQuery()
        console.log("gotRests", gotRests)
        // add infobox open/close state in the data
        let allRestData = []
        gotRests.data.forEach(data => {
          data.showInfoBox = false
          allRestData.push(data)
        });
        // console.log("allRestData post mod:", allRestData)


        startTransition(() => {
          setAllRestaurantsState(allRestData)
        })
      } catch (error) {
        console.warn(error)
      }
    }
    if ((coordinatesState.latitude !== 0 && coordinatesState.longitude !== 0) && searchOnMapMove == false) {
      executePhaseOne()
    }
  }, [coordinatesState, distanceState, searchTermState,searchOnMapMove])

  // Phase 1.1 useEffect -> fetchs new raw restaurant list based on new google map latLng bounds instead of original coordinates + radius, dependencies: [gmapLatLngBounds,  , searchTermState]
  useLayoutEffect(() => {
    const executePhaseOnePointOne = async () => {
      try {
        setIsFetchingRestData(true)
        // setAllRestaurantsState([])
        console.log("executing phase 1.1")
        // setRestListErrorMsg("")
        const gotRests = await getRestaurantsQuery()
        console.log("gotRests", gotRests)
        // add infobox open/close state in the data
        let allRestData = []
        gotRests.data.forEach(data => {
          data.showInfoBox = false
          allRestData.push(data)
        });
        // console.log("allRestData post mod:", allRestData)


        startTransition(() => {
          setAllRestaurantsState(allRestData)
        })
      } catch (error) {
        console.warn(error)
      }
    }
    if (searchOnMapMove) {
      executePhaseOnePointOne()
    }
  }, [searchTermState, gmapBoxState , searchOnMapMove])


  // Phase 2 useEffect -> filteres raw restaurant list, dependencies: [AllRestaurantsState, dowState, FilterParamsState,uiFilterState]
  useLayoutEffect(() => {
    const executePhaseTwo = () => {
      console.log("executing phase 2")
      let filteredRest = []
      if (allRestaurantsState.length > 0) {
        console.log("allRestaurantsState.length > 0, executing code")
        // console.log("filteredRest:", filteredRest)

        filteredRest = deepCopyObj(allRestaurantsState)
        console.log("deepcopied:", filteredRest)
        // console.log("allRestaurantsState_inFilterRest:", allRestaurantsState)
        filteredRest = filterRestByDay(filteredRest, dow, UIFilters.hasOnlyLateNightOnDay.value /* late night/all night only filter flag here*/)
        filteredRest = filterRests(filterParams, filteredRest)
      } else {
        console.log("allRestaurantsState.length = 0, skipping code")
      }
      setFilteredRestaurantsState(filteredRest)
    }
    if (coordinatesState.latitude !== 0 && coordinatesState.longitude !== 0) {
      executePhaseTwo()
    }
  }, [allRestaurantsState, dow, filterParams, UIFilters])


  const handleRestListErrorMsg = () => {
    const errMsg = {
      zeroFetchedData: `No results found. Please modify search terms and try again.`,
      zeroFilterResults: `No results found. Please modify filters and try again.`
    }
    setRestListErrorMsg("")
    console.log("executing error messaging")
    // if(isFetchingRestData) {
    // setRestListErrorMsg("")
    if (allRestaurantsState.length === 0) {
      console.log("error_msg2")
      // setRestListErrorMsg("Whoa, the search did not return any happy hours near this location, please try a different location!")
      setRestListErrorMsg(errMsg.zeroFetchedData)
      return
    }
    if (filteredRestaurantsState.length === 0) {
      console.log("error_msg1")
      // setRestListErrorMsg(`Sorry, we found ${allRestaurantsState.length} places near you, but none of them fit your filter criteria!`)
      setRestListErrorMsg(errMsg.zeroFilterResults)
      return
    }

    console.log("no errors to report")
    // }
  }


  // Phase 3 useEffect -> sorts filtered restaurant list, dependencies: [FilteredRestaurantsState]
  // also handles restaurant list error message rendering
  useLayoutEffect(() => {
    const executePhaseThree = () => {
      // currently there is no sorting.
      console.log("executing phase 3")
      // console.log("filteredRestaurantsState_v2:", filteredRestaurantsState)
      let sortedRestaurants = filteredRestaurantsState
      // sorting code goes here (WIP)
      setShowRestaurantsState(sortedRestaurants)
      handleRestListErrorMsg()
      setIsFetchingRestData(false)
    }
    if (coordinatesState.latitude !== 0 && coordinatesState.longitude !== 0) {
      executePhaseThree()
    }
  }, [filteredRestaurantsState])

  // handles no restaurants
  // useEffect(()=>{

  // },[isFetchingRestData])


  // tracks and updates the height of the main component responsively
  useLayoutEffect(() => {
    const windowHeight = window.innerHeight
    setMainDivStyle({
      minHeight: windowHeight - footerHeight - navBarHeight,
      marginTop: navBarHeight
    })
    setContentHeight(windowHeight - footerHeight - navBarHeight)
  }, [footerHeight, navBarHeight])

  const queryClient = new QueryClient()
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Router>

          <Suspense fallback={<LoadingComp />}>
            <GlobalStateContext.Provider value={globalContextVar}>
              <NavBarContainer
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                setNavBarHeight={setNavBarHeight}
                setAddressState={setAddressState}
                setSearchTermState={setSearchTermState}
                showMap={showMap}
                setShowMap={setShowMap}
                isTWmd={isTWmd}
                setScreenSize={setScreenSize}
              />
            </GlobalStateContext.Provider>
          </Suspense>

          <Routes>
            {/* website routes */}

            <Route
              path='/'
              element={
                <GlobalStateContext.Provider value={globalContextVar}>
                  <LandingPage
                    setSearchParams={setSearchParams}
                    mainDivStyle={mainDivStyle}
                    setAddressState={setAddressState}
                  />
                </GlobalStateContext.Provider>
              }
            />


            <Route
              path='/profile'
              element={
                <Suspense fallback={<LoadingComp />}>
                  <Profile
                    mainDivStyle={mainDivStyle}
                  />
                </Suspense>
              }
            />

            <Route
              path="/restaurants"
              element={
                <Suspense fallback={<LoadingComp />}>
                  <GlobalStateContext.Provider value={globalContextVar}>
                    <Main
                      isFetchingRestData={isFetchingRestData}
                      showRestaurants={showRestaurantsState}
                      setFilterParams={setFilterParams}
                      filterParams={filterParams}
                      dow={dow}
                      setDow={setDow}
                      searchParams={searchParams}
                      coordinatesState={coordinatesState}
                      UIFiltersProps={{ UIFilters, setUIFilters }}
                      mainDivStyle={mainDivStyle}
                      navBarHeight={navBarHeight}
                      restIdxHover={restIdxHover}
                      setRestIdxHover={setRestIdxHover}
                      restListErrorMsg={restListErrorMsg}
                      focusedRestIdx={focusedRestIdx}
                      setShowRestaurantsState={setShowRestaurantsState}
                      showMap={showMap}
                      isTWmd={isTWmd}
                      contentHeight={contentHeight}
                      screenSize={screenSize}
                      searchOnMapMoveProps={{
                        searchOnMapMove,
                        setSearchOnMapMove,
                        gmapBoxState,
                        setGmapBoxState
                      }}
                    />
                  </GlobalStateContext.Provider>
                </Suspense>
              }
            />

            <Route
              path="/restaurant/:id"
              element={
                <Suspense fallback={<LoadingComp />}>
                  <GlobalStateContext.Provider value={globalContextVar}>
                  <RestDetail
                    mainDivStyle={mainDivStyle}
                  />
                  </GlobalStateContext.Provider>
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

            <Route
              path='/dashboard'
              element={
                <Suspense fallback={<LoadingComp />}>
                  <DashBoardContainer
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
            setScreenSize={setScreenSize}
          />
        </Router>
      </QueryClientProvider >
    </div>
  );
}

export default App;
