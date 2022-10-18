import React from 'react'
import { Link } from "react-router-dom"

export default function NavBar() {

    // function to remove token for logging out here
    const handleLogOut = () => {
        console.log("log out")
    }

    return (
        <>
            <nav
                className='flex justify-between static'
            >
                <div>
                    <Link to="/">
                        <p>
                            LOGO HERE
                        </p>
                    </Link>
                </div>

                <div>
                    <input />
                    <label></label>
                    <input />
                    <label></label>
                </div>
                <div
                    className='flex'
                >
                    <Link
                    to="/addnewrestaurant"
                    >
                    <p>Add New Restaurant</p>
                    </Link>
                    <p
                        onClick={handleLogOut}
                    >
                        Log Out
                    </p>
                </div>
            </nav>
        </>
    )
}
