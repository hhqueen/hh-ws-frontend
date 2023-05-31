import React from 'react'
import { Link } from 'react-router-dom'

export default function ProfileLinkComp() {
    return (
        <>
            <Link
                id='Profile_Link'
                onClick={(e) => {
                    // apilogger(e, componentName, 'Profile_Link')
                }}
                to="/profile"
            >

                    Profile
            </Link>
        </>
    )
}
