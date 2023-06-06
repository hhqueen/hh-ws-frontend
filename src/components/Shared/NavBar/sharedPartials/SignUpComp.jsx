import React from 'react'
import { Link } from "react-router-dom"

export default function SignUpComp({unfocusAll}) {

    // check if logged in
    const foundJWT = localStorage.getItem('jwt')

    // if logged in, do not render
    if(foundJWT) return ""
    return (
        <>
            <Link
                id='SignUp_Link'
                onClick={(e) => {
                    // apilogger(e, componentName, 'SignUp_Link')
                    unfocusAll()
                }}
                to="/signup"
            >
                Sign Up
            </Link>
        </>
    )
}
