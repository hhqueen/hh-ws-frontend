import { useEffect, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Dropdown, Avatar } from 'flowbite-react'
import jwt_decode from 'jwt-decode'
import { useImmer } from 'use-immer'
import { useState } from 'react'
import Alpha2BannerComp from './Alpha2BannerComp'
import { RxMagnifyingGlass } from 'react-icons/rx'
import { BsInstagram } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'
import apilogger from '../helperFunctions/apiLogger'

import LogoSmall from './Logo/LogoSmall'
import IG_Logo from './Logo/IG_Logo'
import { useMediaQuery } from 'react-responsive'


const emptyUserInfo = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "id": "",
}

export default function NavBar({ setNavBarHeight, searchParams, setSearchParams, handleSearchFormSubmit, geoLocAvail }) {
    const componentName = "NavBar"

    // media Queries
    const isTWmd = useMediaQuery({ query: '(min-width: 768px)' })


    const navBarDiv = useRef(null)
    const renderSearchBar = false
    const pathName = window.location.pathname
    // console.log("pathName:",pathName)
    const navigate = useNavigate()
    const [alpha2, setAlpha2] = useState(false)
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
    const appendSearchHistory = (searchParam) => {
        const now = new Date()
        const newEntry = {
            searchTerm: searchParam.searchTerm,
            address: searchParam.address,
            date_UTC_ISO: now.toUTCString()
        }
        if (localStorage.getItem('sh')) {
            const getHistoryArr = JSON.parse(localStorage.getItem('sh'))
            getHistoryArr.push(newEntry)
            if (getHistoryArr.length > 3) {
                getHistoryArr.shift()
            }
            localStorage.setItem('sh', JSON.stringify(getHistoryArr))
            console.log("getHistoryArr:", localStorage.getItem('sh'))
        } else {
            const newHistoryArr = [newEntry]
            localStorage.setItem('sh', JSON.stringify(newHistoryArr))
            // console.log("newHistoryArr:",localStorage.getItem('sh'))
        }
    }

    const getMostRecentSearchHistory = () => {
        if (localStorage.getItem('sh')) {
            const getHistoryArr = JSON.parse(localStorage.getItem('sh'))
            const mostRecent = getHistoryArr[getHistoryArr.length - 1]
            return mostRecent
        }
    }

    return (
        <>
            <div
                className='fixed flex md:flex-col w-[100vw] top-0 z-50 bg-[#372A88]'
                ref={navBarDiv}
            >
                <Navbar
                    class="w-full"
                    menuOpen={true}
                // fluid={true}
                // rounded={true}
                >
                    <Navbar.Brand
                        href="/">
                        <LogoSmall />
                        {/* </Link> */}
                    </Navbar.Brand>

                    {/* Search Inputs */}
                    {/* logic that conditionally renders the search bar when NOT landing page */}
                    {(pathName !== "/" && renderSearchBar) &&
                        <>
                            <div
                            >
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        appendSearchHistory(searchParams)
                                        handleSearchFormSubmit()
                                        navigate('/restaurants/')
                                    }}
                                >
                                    {/* search Term Input */}
                                    <input
                                        className='border w-[50vw] rounded-t p-0 m-0'
                                        value={searchParams.searchTerm}
                                        onChange={(e) => {
                                            setSearchParams((draft) => { draft.searchTerm = e.target.value }
                                            )
                                        }}
                                    />

                                    <div
                                        className='bg-transparent'
                                    >
                                        {/* Location Input */}
                                        <input
                                            className='border w-[45vw] rounded-bl p-0 m-0'
                                            value={searchParams.address}
                                            list="searchLocationList"
                                            onChange={(e) => {
                                                setSearchParams((draft) => { draft.address = e.target.value }
                                                )
                                            }}
                                        />

                                        <datalist id="searchLocationList">
                                            <option className="font-['Roboto']" value="Current Location">Current Location</option>
                                        </datalist>

                                        {/* Submit Button */}
                                        <button
                                            className='border w-[5vw] rounded-br h-[26px] bg-gray-100'
                                            type='submit'
                                        // onClick={() => {
                                        //     appendSearchHistory(searchParams)
                                        //     handleSearchFormSubmit()
                                        // }}
                                        ><RxMagnifyingGlass /></button>
                                    </div>
                                </form>
                            </div>
                        </>
                    }

                    <div className="flex justify-around w-[35vw] md:w-[30vw] md:order-2 items-center">
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
                                        name="newsletter_p"
                                        id='newsletter_p'
                                        onClick={(e) => {
                                            apilogger(e, componentName, 'newsletter_p')
                                        }}
                                        href='' target="_blank">
                                        <div
                                            className=''

                                        >
                                            <p
                                                className=''
                                            >Newsletter</p>
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
                                        href='' target="_blank">
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
                                        href='https://www.instagram.com/hhqueen.official/' target="_blank">
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
                                    name="newsletter_p"
                                    id='newsletter_p'
                                    onClick={(e) => {
                                        apilogger(e, componentName, 'newsletter_p')
                                    }}
                                    href='' target="_blank">
                                    <div
                                        className='px-3'

                                    >
                                        <p
                                            className='text-white'
                                        >Newsletter</p>
                                    </div>
                                </a>

                                {/* mail icon */}
                                <a
                                    name="mail_icon"
                                    id='mail_icon'
                                    onClick={(e) => {
                                        apilogger(e, componentName, 'mail_icon')
                                    }}
                                    href='' target="_blank">
                                    <div
                                        className='px-3'

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
                                    href='https://www.instagram.com/hhqueen.official/' target="_blank">
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
                                />}
                        >

                            {
                                localStorage.getItem('jwt') &&
                                <>
                                    <Dropdown.Header>
                                        <span className="block text-sm">
                                            {`${userInfo.firstName} ${userInfo.lastName}`}
                                        </span>
                                        <span className="block truncate text-sm font-medium">
                                            {userInfo.email}
                                        </span>
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
                                </>
                            }

                            {
                                localStorage.getItem('jwt') &&
                                <Dropdown.Item
                                    onClick={(e) => {
                                        apilogger(e, componentName, 'LogOut_Link')
                                        handleLogOut()
                                    }}
                                >
                                    Sign out
                                </Dropdown.Item>
                                // </div>
                            }



                        </Dropdown>
                    </div>
                </Navbar>

                {alpha2 &&
                    <Alpha2BannerComp />
                }

            </div>
        </>
    )
}
