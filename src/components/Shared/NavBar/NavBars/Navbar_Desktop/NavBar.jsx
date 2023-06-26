// library imports
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Dropdown, Avatar } from 'flowbite-react'
import jwt_decode from 'jwt-decode'
import { useImmer } from 'use-immer'


// internal comps
// import Alpha2BannerComp from '../../../Alpha2BannerComp'
import apilogger from '../../../../../helperFunctions/apiLogger'
import SearchBar from './partials/SearchBar'
import LogoSmall from '../../../Logo/LogoSmall'
import IG_Logo from '../../../Logo/IG_Logo'
// import MailIconDesktop from './partials/MailIcon_Desktop'
import MailIconComp from '../../sharedPartials/MailIconComp'


// react-icons

import MapListToggle from './partials/MapListToggle'

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
    handleSubmit
}) {
    const componentName = "NavBar"

    const navBarDiv = useRef(null)

    const renderSearchBar = true
    // const pathName = window.location.pathname
    // console.log("pathName:",pathName)
    const navigate = useNavigate()
    const [alpha2] = useState(false)
    const [userInfo, setUserInfo] = useImmer(emptyUserInfo)

    // function to remove token for logging out here
    const handleLogOut = () => {
        console.log("log out")
        // check to see if a token exists in local storage
        if (localStorage.getItem('jwt')) {
            // if so, delete it 
            localStorage.removeItem('jwt')
            navigate('/login')
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
                // onSubmit={handleSubmit}
                ref={navBarDiv}
            >
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
                                    showText={isTWmd ? true : false}
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
                                        handleSubmit={handleSubmit}
                                    />
                                </div>
                            </>
                        }




                        <div className="flex justify-around md:w-fit md:gap-10 md:order-2 items-center">



                            {/* medium Media Query Items */}

                            {/* newsletter */}
                            <a
                                name="survey_p"
                                id='survey_p'
                                onClick={(e) => {
                                    apilogger(e, componentName, 'survey_p')
                                }}
                                href='https://docs.google.com/forms/d/e/1FAIpQLSfVTC5A4W9LeuPXbR70ROILcFwTKneThVzZTh9ATTw0DHWgrQ/viewform' target="_blank" rel="noreferrer">
                                <div
                                    className=''

                                >
                                    <p
                                        className='text-white'
                                    >Survey</p>
                                </div>
                            </a>

                            {/* mail icon */}
                            <MailIconComp />
                            {/* IG Icon */}
                            <a
                                name="IG_Link"
                                id='IG_Link'
                                onClick={(e) => {
                                    apilogger(e, componentName, 'IG_Link')
                                }}
                                href='https://www.instagram.com/hhqueen.official/' target="_blank" rel="noreferrer">
                                <div
                                    className=''

                                >
                                    <IG_Logo
                                        height={45}
                                    />
                                </div>
                            </a>



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



                            </Dropdown>
                        </div>
                    </div>
                </Navbar>


            </div>
        </>
    )
}
