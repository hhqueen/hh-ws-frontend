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
            className='flex justify-between'
            >
            <div>
                <Link to="/">
                    <p>
                        LOGO HERE
                    </p>
                </Link>
            </div>

            <div
                className='flex'
            >

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
