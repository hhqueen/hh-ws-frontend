import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LogOutComp({handleLogOut}) {
    const navigate = useNavigate()
    const foundJWT = localStorage.getItem("jwt")
    // const handleLogOut = () => {
    //     console.log("attempt log out")
    //     // check to see if a token exists in local storage
    //     if (foundJWT) {
    //         console.log("user token found in localStorage")
    //       // if so, delete it 
    //       localStorage.removeItem('jwt')
    //         console.log("user logged out, navigating to home")
    //       navigate('/')
    //     } else {
    //         console.log("no user token found in localStorage, logOut aborted")
    //     }
    //     // setUserInfo(emptyUserInfo)
    //   }

    //   do not render if no JWT found
      if (!foundJWT) return ""
    return (
        <div
            onClick={(e) => {
                // apilogger({ componentName, elementId: 'LogOut_Link' })
                handleLogOut()
            }}
        >
            Sign out
        </div>
    )
}
