import React from 'react'
import { Link } from "react-router-dom"

export default function AddNewRestComp() {
    return (
        <>
            <Link
                id='AddNewRestaurant_Link'
                onClick={(e) => {
                    // apilogger(e, componentName, 'AddNewRestaurant_Link')
                }}
                to="/addnewrestaurant"
            >
                {/* <Dropdown.Item> */}
                    Add New Restaurant
                {/* </Dropdown.Item> */}
            </Link>
        </>
    )
}
