// library imports
import { useEffect, useRef, useState, useTransition } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Dropdown } from 'flowbite-react'
import jwt_decode from 'jwt-decode'
import { useImmer } from 'use-immer'
import {BsBoxArrowLeft} from 'react-icons/bs'

// internal comps
import Alpha2BannerComp from '../../../../Alpha2BannerComp'
import apilogger from '../../../../../helperFunctions/apiLogger'
import SearchBar from './partials/SearchBar'
import LogoSmall from '../../../Logo/LogoSmall'
import IG_Logo from '../../../Logo/IG_Logo'
// import MailIconDesktop from './partials/MailIcon_Desktop'
import MailIconMobile from './partials/MailIcon_Mobile'
import HamburgerIcon from './partials/HamburgerIcon'
import MapListToggle from './partials/MapListToggle'
import DropDownComp from './partials/DropDownComp'
import SearchTermInput from './partials/SearchTermInput'
import AddressSubmitInputContainer from './partials/AddressSubmitInput/AddressSubmitInputContainer'
import SearchLocationHistoryComp from './partials/SearchLocationHistoryComp'
import SearchTermHistoryComp from './partials/SearchTermHistoryComp'
import HamburgerDropDown from './partials/HamburgerDropDown'


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
  const componentName = "NavBar_v2"

  const navBarDiv = useRef(null)
  const [isPending, startTransition] = useTransition()

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

  const focusEnum = {
    nothing: -1,
    searchTermInput: 0,
    addressInput: 1,
    hamburger: 2
  }
  const [focusedVal, setFocusedVal] = useImmer(focusEnum.nothing)

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

  const isInputsFocused = () => {
    if (focusedVal === focusEnum.searchTermInput || focusedVal === focusEnum.addressInput) return true
    return false
  }

  const isHamburgerFocused = () => {
    if (focusedVal === focusEnum.hamburger) return true
    return false
  }

  const focusSearchTermInput = () => { startTransition(() => setFocusedVal(focusEnum.searchTermInput)) }
  const focusAddressInput = () => { startTransition(() => setFocusedVal(focusEnum.addressInput)) }
  const focusHamburger = () => { startTransition(() => setFocusedVal(focusEnum.hamburger)) }

  const unfocusAll = () => { startTransition(() => setFocusedVal(focusEnum.nothing)) }

  // const renderDropDownComp = () => {
  //   if (isInputsFocused() || isHamburgerFocused()) return true
  //   return false
  // }

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

  // focus dependent drop down rendering
  useEffect(() => {
    console.log("focusedVal:", focusedVal)

      switch (focusedVal) {

        case focusEnum.searchTermInput:
          // code here
          console.log("searchTerms history dropdown rendering");
          // draft.dropDownLiComp=<></>
          break;
  
        case focusEnum.addressInput:
          // code here
          console.log("address history dropdown rendering");
          // draft.dropDownLiComp=<></>
          break;
  
        case focusEnum.hamburger:
          // code here
          console.log("hamburger dropdown rendering");
          setDropDownState((draft)=>{
          draft.dropDownLiComp=<><HamburgerDropDown/></>});
          break;
  
        default: // focusEnum.nothing
        // code here 
      }

  }, [focusedVal])

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
        {/* conditionally render dropdown based on selection */}
        {
          dropDownState.isOpen &&
          <DropDownComp
            ComponentToRender={dropDownState.dropDownLiComp}
            className=""
            style={{
              marginTop: navBarDiv.current.clientHeight
            }}
          />
        }

        {/* render navBar */}
        <Navbar
          class="w-full px-2"
        // menuOpen={true}
        // fluid={true}
        // rounded={true}
        >
          {/* navBar Items Container */}
          <div
            className='w-full flex flex-col justify-between'
          >

            <div
              className='w-full flex justify-between'
            >
              {/* Logo Container */}
              {(
                !isInputsFocused()
                // && !isHamburgerFocused()
              )
                ?
                <div>
                  <Navbar.Brand
                    href="/">
                    <LogoSmall
                      showText={isTWmd}
                    />
                    {/* </Link> */}
                  </Navbar.Brand>
                </div>
                :
                <div
                  onClick={unfocusAll}
                  className='flex justify-center items-center mr-3'
                >
                  <BsBoxArrowLeft
                    color='white'
                    size={40}
                  />
                </div>

              }

              <form
                onSubmit={handleSubmit}
                className={!isInputsFocused() ? "flex w-[200px]" : 'flex flex-col w-full'}
              >
                {/* Search Inputs */}
                {(
                  // pathName !== "/" &&          // logic that conditionally renders the search bar when NOT landing page
                  renderSearchBar) &&
                  <>

                    <SearchTermInput
                      searchParams={searchParams}
                      setSearchParams={setSearchParams}
                      focusSearchTermInput={focusSearchTermInput}
                      unfocusAll={unfocusAll}
                      isInputsFocused={isInputsFocused}
                    />


                    {
                      isInputsFocused() &&
                      <>
                        <AddressSubmitInputContainer
                          searchParams={searchParams}
                          setSearchParams={setSearchParams}
                          focusAddressInput={focusAddressInput}
                          unfocusAll={unfocusAll}
                          isInputsFocused={isInputsFocused}
                        />
                      </>
                    }
                  </>
                }
                <input
                  type='submit'
                  hidden={true}
                />
              </form>
              {
                !isTWmd && !isInputsFocused() && //!window.location.pathname === "/" &&
                <>
                  {/* code to render map / list toggle icon for mobile */}
                  <MapListToggle
                    showMap={showMap}
                    setShowMap={setShowMap}
                  />
                </>
              }

              {!isInputsFocused() &&

                <div className="flex justify-around md:w-fit md:gap-10 md:order-2 items-center">
                  {/* small width media query here (HAMBURGER) WIP */}
                  <HamburgerIcon
                    focusHamburger={focusHamburger}
                    unfocusAll={unfocusAll}
                    // isFocusedValNothing={isFocusedValNothing}
                  />
                </div>
              }
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
