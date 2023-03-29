import { useEffect, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Dropdown, Avatar } from 'flowbite-react'
import jwt_decode from 'jwt-decode'
import { useImmer } from 'use-immer'
import { useState } from 'react'
import Alpha2BannerComp from './Alpha2BannerComp'
import { FiMail } from 'react-icons/fi'
import apilogger from '../helperFunctions/apiLogger'
import SearchBar from './SearchBar'
import LogoSmall from './Shared/Logo/LogoSmall'
import IG_Logo from './Shared/Logo/IG_Logo'
import { useMediaQuery } from 'react-responsive'


const emptyUserInfo = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "id": "",
}

export default function NavBar({
    setNavBarHeight, searchParams, setSearchParams,
    setAddressState, setSearchTermState
}) {
    const componentName = "NavBar"

    // media Queries
    const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })


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
    })

    useEffect(() => {
        // console.log("searchParams:",searchParams)
        if (searchParams.address.length === 0) {
            setSearchParams((draft) => { draft.address = "Current Location" })
        }
    }, [])

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
                        {/* logic that conditionally renders the search bar when NOT landing page */}
                        {(
                            // pathName !== "/" && 
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



                        <div className="flex justify-around md:w-fit md:gap-10 md:order-2 items-center">
                            {/* small width media query here (HAMBURGER) WIP */}
                            {
                                !isTWmd &&

                                <Dropdown
                                    label={""}
                                    arrowIcon={true}
                                    inline={true}
                                    dismissOnClick={true}
                                >
                                    <Dropdown.Item>
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
                                                    className=''
                                                >Survey</p>
                                            </div>
                                        </a>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <a
                                            name="mail_icon"
                                            id='mail_icon'
                                            onClick={(e) => {
                                                apilogger(e, componentName, 'mail_icon')
                                            }}
                                            href='/' target="_blank">
                                            <div
                                                className='flex items-center'

                                            >
                                                <FiMail
                                                    size={40}
                                                    opacity={.6}
                                                />
                                                <p
                                                    className='pl-3'
                                                >Mail Us</p>
                                            </div>
                                        </a>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <a
                                            name="IG_Link"
                                            id='IG_Link'
                                            onClick={(e) => {
                                                apilogger(e, componentName, 'IG_Link')
                                            }}
                                            href='https://www.instagram.com/hhqueen.official/' target="_blank" rel="noreferrer">
                                            <div
                                                className='flex items-center'

                                            >
                                                <IG_Logo
                                                    height={45}
                                                />
                                                <p
                                                    className='pl-3 break-normal w-[70%]'
                                                >Follow us on Instagram</p>
                                            </div>
                                        </a>
                                    </Dropdown.Item>
                                </Dropdown>
                            }


                            {/* medium Media Query Items */}
                            {isTWmd &&
                                <>

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
                                    <a
                                        name="mail_icon"
                                        id='mail_icon'
                                        onClick={(e) => {
                                            apilogger(e, componentName, 'mail_icon')
                                        }}
                                        href='/' target="_blank">
                                        <div
                                            className=''

                                        >
                                            <FiMail
                                                size={40}
                                                opacity={.6}
                                                color={`white`}
                                            />
                                        </div>
                                    </a>
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
                                </>
                            }

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

                {alpha2 &&
                    <Alpha2BannerComp />
                }

            </div>
        </>
    )
}
