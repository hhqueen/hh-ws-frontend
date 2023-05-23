// library imports
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Dropdown } from 'flowbite-react'
import jwt_decode from 'jwt-decode'
import { useImmer } from 'use-immer'


// internal comps
import Alpha2BannerComp from '../../../../Alpha2BannerComp'
import apilogger from '../../../../../helperFunctions/apiLogger'
import SearchBar from './partials/SearchBar'
import LogoSmall from '../../../Logo/LogoSmall'
import IG_Logo from '../../../Logo/IG_Logo'
// import MailIconDesktop from './partials/MailIcon_Desktop'
import MailIconMobile from './partials/MailIcon_Mobile'
import HamburgerMobile from './partials/HamburgerMobile'

// react-icons

import MapListToggle from './partials/MapListToggle'
import DropDownComp from './partials/DropDownComp'
import SearchTermHistoryComp from './partials/SearchTermHistoryComp'
import SurveyComp from '../../sharedPartials/SurveyComp'
import Ig_IconComp from '../../sharedPartials/Ig_IconComp'

// require helper functions
const { emailBodyStringBuilder } = require("../../../../../helperFunctions/emailBodyStringBuilder")

const emptyUserInfo = {
  "firstName": "",
  "lastName": "",
  "email": "",
  "id": "",
}

export default function NavBar({
  setNavBarHeight, searchParams, setSearchParams,
  setAddressState, setSearchTermState,
  showMap,
  setShowMap,
  isTWmd,
  setScreenSize,
  hamburgerDropDownArr
}) {
  const componentName = "NavBar_v2"

  const navBarDiv = useRef(null)

  const renderSearchBar = true
  // const pathName = window.location.pathname
  // console.log("pathName:",pathName)
  const navigate = useNavigate()
  const [alpha2] = useState(false)
  const [userInfo, setUserInfo] = useImmer(emptyUserInfo)

  const [dropDownState, setDropDownState] = useImmer({
    isOpen: false,
    dropDownLiComp: <></>,
  })

  const [focusedComp, setFocusedComp] = useImmer({
    searchTermInput: false,
    addressInput: false,
    hamburger: false
  })

  // const hamburgerDropDownDivStyles = "text-center"
  const hamburgerDropDownComps = hamburgerDropDownArr.map((comp) => {
    // console.log("comp", comp)
    console.log("comp", comp)
    if (comp.toRender === false) return ""
    return (
      <>
        <div
          className="my-2"
        >
          {comp.component}
        </div>
      </>
    )
  })

  const unfocusOthers = (focusedCompStr) => {
    if (
      focusedCompStr !== "searchTermInput"
      && focusedCompStr !== "addressInput"
      && focusedCompStr !== "hamburger"
    ) {
      return console.log(`error, navbar focus input term "${focusedCompStr}" incorrect, expecting "searchTermInput", "addressInput", or "hamburger"`)
    }
    const focusedCompsKeys = Object.keys(focusedComp)
    const keysToUnfocus = focusedCompsKeys.filter((key) => key !== focusedCompStr)
    setFocusedComp(draft => keysToUnfocus.map(key => draft[key] = false))
  }

  // const setDropDown = (focusedCompStr, dropDownComp) => {
  //   // searchTermInput
  //   // addressInput
  //   // hamburger
  // }

  // function to remove token for logging out here
  const handleLogOut = () => {
    console.log("log out")
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it 
      localStorage.removeItem('jwt')
      navigate('/')
    }
    setUserInfo(emptyUserInfo)
  }

  // set user Info for NavBar use from jwt token
  useEffect(() => {
    // console.log("navbar useEffect")
    if (localStorage.getItem('jwt')) {
      const token = localStorage.getItem('jwt')
      const decoded = jwt_decode(token)
      // console.log("decoded",decoded)
      setUserInfo((draft) => {
        draft.firstName = decoded.firstName
        draft.lastName = decoded.lastName
        draft.email = decoded.email
        draft.id = decoded.id
      })
      // renderAddRest = checkAdmin(decoded)
    }
    // console.log("navBarDiv.current.clientHeight:",navBarDiv.current.clientHeight)

    setNavBarHeight(navBarDiv.current.clientHeight)

    setScreenSize((draft) => { draft.component.navBarHeight = navBarDiv.current.clientHeight })
  })

  // useEffect(() => {
  //     // console.log("searchParams:",searchParams)
  //     if (searchParams.address.length === 0) {
  //         setSearchParams((draft) => { draft.address = "Current Location" })
  //     }
  // }, [])

  // create / update search history


  // const getMostRecentSearchHistory = () => {
  //     if (localStorage.getItem('sh')) {
  //         const getHistoryArr = JSON.parse(localStorage.getItem('sh'))
  //         const mostRecent = getHistoryArr[getHistoryArr.length - 1]
  //         return mostRecent
  //     }
  // }

  return (
    <>
      <div
        className='fixed flex justify-center md:flex-col w-full top-0 z-50 bg-[#372A88]'
        ref={navBarDiv}
      >
        {/* conditionally render dropdown based on selection */}
        {
          dropDownState.isOpen &&
          <DropDownComp
            ComponentToRender={dropDownState.dropDownLiComp}
          />
        }

        {/* render navBar */}
        <Navbar
          class="w-f"
          menuOpen={true}
        // fluid={true}
        // rounded={true}
        >
          {/* navBar Items Container */}
          <div
            className='w-full flex justify-between'
          >

            {/* Logo Container */}
            <div>
              <Navbar.Brand
                href="/">
                <LogoSmall
                  showText={isTWmd}
                />
                {/* </Link> */}
              </Navbar.Brand>
            </div>


            {/* Search Inputs */}
            {(
              // pathName !== "/" &&          // logic that conditionally renders the search bar when NOT landing page
              renderSearchBar) &&
              <>
                <div
                  className='flex items-center'
                >
                  <SearchBar
                    setAddressState={setAddressState}
                    setSearchTermState={setSearchTermState}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                  />
                </div>
              </>
            }

            {
              !isTWmd && //!window.location.pathname === "/" &&
              <>
                {/* code to render map / list toggle icon for mobile */}
                <MapListToggle
                  showMap={showMap}
                  setShowMap={setShowMap}
                />
              </>
            }


            <div className="flex justify-around md:w-fit md:gap-10 md:order-2 items-center">
              {/* small width media query here (HAMBURGER) WIP */}


              {/* <Dropdown
                label={""}
                arrowIcon={true}
                inline={true}
                dismissOnClick={true}
              >

                <Dropdown.Item>
                  <SurveyComp />
                </Dropdown.Item>

                <Dropdown.Item>
                  <MailIconMobile />
                </Dropdown.Item>

                <Dropdown.Item>
                  <Ig_IconComp />
                </Dropdown.Item>

              </Dropdown> */}


              <HamburgerMobile
                setDropDownIsOpenState={
                  () => {
                    setDropDownState(draft => {
                      draft.isOpen = !draft.isOpen
                      draft.dropDownLiComp = hamburgerDropDownComps
                    })
                  }
                }
              />
              {/* 
                            <Dropdown
                                arrowIcon={false}
                                inline={true}
                                label={
                                    <Avatar
                                        placeholderInitials={localStorage.getItem('jwt') && `${userInfo.firstName[0]}${userInfo.lastName[0]}`}
                                        rounded={true}

                                    />
                                }
                            >

                                {
                                    localStorage.getItem('jwt') &&
                                    <>
                                        <Dropdown.Header
                                        // class="hover:bg-slate-400"
                                        // onClick={()=>{}}
                                        >
                                            <div
                                                className="hover:bg-slate-100 rounded"
                                            // onClick={navigate("/profile")}
                                            >
                                                <span className="block text-sm">
                                                    {`${userInfo.firstName} ${userInfo.lastName}`}
                                                </span>
                                                <span className="block truncate text-sm font-medium">
                                                    {userInfo.email}
                                                </span>
                                            </div>
                                        </Dropdown.Header>
                                    </>
                                }

                                {
                                    !localStorage.getItem('jwt') &&
                                    <>
                                        <Link
                                            id='Login_Link'
                                            onClick={(e) => {
                                                apilogger(e, componentName, 'Login_Link')
                                            }}
                                            to="/login"
                                        >
                                            <Dropdown.Item>
                                                Log In
                                            </Dropdown.Item>
                                        </Link>


                                        <Link
                                            id='SignUp_Link'
                                            onClick={(e) => {
                                                apilogger(e, componentName, 'SignUp_Link')
                                            }}
                                            to="/signup"
                                        >
                                            <Dropdown.Item>
                                                Sign Up
                                            </Dropdown.Item>
                                        </Link>
                                    </>
                                }

                                {
                                    localStorage.getItem('jwt') && jwt_decode(localStorage.getItem('jwt')).auth === "Admin" &&
                                    <>
                                        <Link
                                            id='AddNewRestaurant_Link'
                                            onClick={(e) => {
                                                apilogger(e, componentName, 'AddNewRestaurant_Link')
                                            }}
                                            to="/addnewrestaurant"
                                        >
                                            <Dropdown.Item>
                                                Add New Restaurant
                                            </Dropdown.Item>
                                        </Link>
                                        <Link
                                            id='DashBoard_Link'
                                            onClick={(e) => {
                                                apilogger(e, componentName, 'DashBoard_Link')
                                            }}
                                            to="/dashboard"
                                        >
                                            <Dropdown.Item>
                                                DashBoard
                                            </Dropdown.Item>
                                        </Link>
                                    </>
                                }

                                {
                                    localStorage.getItem('jwt') &&

                                    <>
                                        <Link
                                            id='Profile_Link'
                                            onClick={(e) => {
                                                apilogger(e, componentName, 'Profile_Link')
                                            }}
                                            to="/profile"
                                        >
                                            <Dropdown.Item
                                            // onClick={(e) => {
                                            //     apilogger({ componentName, elementId: 'LogOut_Link' })
                                            //     handleLogOut()
                                            // }}
                                            >
                                                Profile
                                            </Dropdown.Item>
                                        </Link>

                                        <Dropdown.Item
                                            onClick={(e) => {
                                                apilogger({ componentName, elementId: 'LogOut_Link' })
                                                handleLogOut()
                                            }}
                                        >
                                            Sign out
                                        </Dropdown.Item>
                                    </>

                                    // </div>
                                }



                            </Dropdown> */}
            </div>
          </div>
        </Navbar>

        {alpha2 &&
          <Alpha2BannerComp />
        }

      </div>
    </>
  )
}
