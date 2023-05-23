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
  setScreenSize
}) {
  // const navigate = useNavigate()
  const [avatarDropDownComps, setAvatarDropDownComps] = useImmer([])
  const [userInfo, setUserInfo] = useImmer(emptyUserInfo)


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

    // setNavBarHeight(navBarDiv.current.clientHeight)

    // setScreenSize((draft) => { draft.component.navBarHeight = navBarDiv.current.clientHeight })
  })
  const foundJWT = localStorage.getItem('jwt')

  const handleLogOut = () => {
    console.log("attempt log out")
    // check to see if a token exists in local storage
    if (foundJWT) {
        console.log("user token found in localStorage")
      // if so, delete it 
      localStorage.removeItem('jwt')
      setUserInfo(emptyUserInfo)
        console.log("user logged out, navigating to home")
      // navigate('/')
    } else {
        console.log("no user token found in localStorage, logOut aborted")
    }
    // setUserInfo(emptyUserInfo)
  }

  const addRenderLogic = (renderArr, toRenderLogic) => {
    const internalArr = []
    renderArr.forEach((comp)=>{
      internalArr.push({
        component:comp,
        toRender: toRenderLogic
      })
    })
    return internalArr
  }



  useEffect(()=>{
    // setAvatarDropDownComps(prev => prev = [])
    // setAvatarDropDownComps(prev=>[...prev, ...avatarComps.renderRegardless, ...avatarComps.noJWT, ...avatarComps.hasJWT])
    const avatarComps = {
      renderRegardless: addRenderLogic([
          <AddNewRestComp />,
          <DashBoardComp />
        ], true),
      
      noJWT: addRenderLogic([
          <LogInComp />,
          <SignUpComp />
        ], userInfo.id === ""),
      
      hasJWT: addRenderLogic([
          <LogOutComp 
          handleLogOut={handleLogOut}
          foundJWT={foundJWT}
          />
        ],userInfo.id !== "")
    }
    setAvatarDropDownComps(prev => prev = [...avatarComps.renderRegardless, ...avatarComps.noJWT, ...avatarComps.hasJWT])

  },[userInfo])


  const additionalIconsComps = addRenderLogic([
        <SurveyComp />,
        <MailIconComp />,
        <Ig_IconComp />
      ],true)

  //   const handleSubmit = (e) => {
  //     e.preventDefault()
  //     // new code
  //     console.log("search term, address",searchParams.searchTerm, searchParams.address)
  //     setSearchTermState(searchParams.searchTerm)
  //     setAddressState(searchParams.address)
  //     appendSearchHistory(searchParams.searchTerm, searchParams.address)
  //     // keep this regardless
  //     navigate('/restaurants/')
  // }
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
      additionalIconsComps={additionalIconsComps}
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
      hamburgerDropDownArr={[...additionalIconsComps, ... avatarDropDownComps]}
    />
  }
  return (
    <>
      {renderNavBar}
    </>
  )
}
