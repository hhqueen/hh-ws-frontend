import React from 'react'
import { Link } from 'react-router-dom'

export default function DashBoardComp() {
    return (
        <>
        <Link
            id='DashBoard_Link'
            onClick={(e) => {
                // apilogger(e, componentName, 'DashBoard_Link')
            }}
            to="/dashboard"
        >
            {/* <Dropdown.Item> */}
                DashBoard
            {/* </Dropdown.Item> */}
        </Link>
        </>
    )
}
