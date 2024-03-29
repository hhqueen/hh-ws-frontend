import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import NavBar_Mobile from './NavBars/NavBar_Mobile/NavBar'
import NavBar_Desktop from './NavBars/Navbar_Desktop/NavBar'

// avatarDropDownComps
import AddNewRestComp from "./sharedPartials/AddNewRestComp"
import DashBoardComp from './sharedPartials/DashBoardComp'
import LogInComp from './sharedPartials/LogInComp'
import SignUpComp from './sharedPartials/SignUpComp'
import LogOutComp from './sharedPartials/LogOutComp'


// additionalIconsComps
import SurveyComp from './sharedPartials/SurveyComp'
import MailIconComp from './sharedPartials/MailIconComp'
import Ig_IconComp from './sharedPartials/Ig_IconComp'

// const NavBarDesktop = lazy(() => import('./NavBars/Navbar_Desktop/NavBar))
// const NavBarMobile = lazy(() => import('./NavBars/NavBar_Mobile/NavBar'))
import appendSearchHistory from '../../../helperFunctions/appendSearchHistory'
import { useImmer } from 'use-immer'
import visitorActivityLogger from '../../../helperFunctions/visitorActivityLogger'

const emptyUserInfo = {
  "firstName": "",
  "lastName": "",
  "email": "",
  "id": "",
}

export default function NavBarContainer({
  setNavBarHeight,
  searchParams,
  setSearchParams,
  setAddressState,
  setSearchTermState,
  showMap,
  setShowMap,
  isTWmd,
  setScreenSize,
  userInfo,
  clearUserData
}) {
  const navigate = useNavigate()
  const [avatarDropDownComps, setAvatarDropDownComps] = useImmer([])

  const handleLogOut = async () => {
    try {
      visitorActivityLogger({
        elementId:"va5",
        message:`User manually signed out`
      })
    } catch (error) {
      console.warn(error)
    }
    clearUserData()
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    // new code
    console.log("search term, address", searchParams.searchTerm, searchParams.address)
    // console.log("handleSubmi searchParams", searchParams)
    setSearchTermState(searchParams.searchTerm)
    setAddressState(searchParams.address)
    appendSearchHistory(searchParams.searchTerm, searchParams.address)
    try {
      visitorActivityLogger({
        elementId:"va4",
        message:`Search submitted with searchTerm: ${searchParams.searchTerm} and address:${searchParams.address}`
      })
    } catch (error) {
      console.warn(error)
    }

    // keep this regardless
    navigate('/restaurants/')
  }

  // conditionally render based on screen size (reference tailwind medium)
  let renderNavBar
  if (isTWmd) {
    renderNavBar = <NavBar_Desktop
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      setNavBarHeight={setNavBarHeight}
      setAddressState={setAddressState}
      setSearchTermState={setSearchTermState}
      showMap={showMap}
      setShowMap={setShowMap}
      isTWmd={isTWmd}
      setScreenSize={setScreenSize}
      avatarDropDownComps={avatarDropDownComps}
      handleSubmit={handleSubmit}
      handleLogOut={handleLogOut}
    />
  } else {
    renderNavBar = <NavBar_Mobile
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      setNavBarHeight={setNavBarHeight}
      setAddressState={setAddressState}
      setSearchTermState={setSearchTermState}
      showMap={showMap}
      setShowMap={setShowMap}
      isTWmd={isTWmd}
      setScreenSize={setScreenSize}
      handleSubmit={handleSubmit}
      handleLogOut={handleLogOut}
    />
  }
  return (
    <>
      {renderNavBar}
    </>
  )
}
