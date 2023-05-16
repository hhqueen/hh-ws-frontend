import React from 'react'

import NavBar_Mobile from './NavBars/NavBar_Mobile/NavBar'
import NavBar_Desktop from './NavBars/Navbar_Desktop/NavBar'

// const NavBarDesktop = lazy(() => import('./NavBars/Navbar_Desktop/NavBar))
// const NavBarMobile = lazy(() => import('./NavBars/NavBar_Mobile/NavBar'))

export default function NavBarContainer({
  setNavBarHeight, searchParams, setSearchParams,
  setAddressState, setSearchTermState,
  showMap,
  setShowMap,
  isTWmd,
  setScreenSize
}) {
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
    />
  }
  return (
    <>
      {renderNavBar}
    </>
  )
}
