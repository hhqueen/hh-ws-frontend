import React from 'react'
import { Link } from 'react-router-dom'

export default function DashBoardLinkComp() {
    return (
        <>
            <Link
                id='DashBoard_Link'
                onClick={(e) => {
                    // apilogger(e, componentName, 'Profile_Link')
                }}
                to="/dashboard"
            >
                DashBoard
            </Link>
        </>
    )
}
