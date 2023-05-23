import React from 'react'
import { Link } from "react-router-dom"

export default function LogInComp() {

    // check if logged in
    const foundJWT = localStorage.getItem('jwt')

    // if logged in, do not render
    if(foundJWT) return ""
    return (
        <>
            <Link
                id='Login_Link'
                onClick={(e) => {
                    // apilogger(e, componentName, 'Login_Link')
                }}
                to="/login"
            >
                    Log In
            </Link>
        </>
    )
}
