// import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Avatar, Navbar, Dropdown } from 'flowbite-react'

import jwt_decode from 'jwt-decode'

export default function NavBar() {
    const navigate = useNavigate()

    // function to remove token for logging out here
    const handleLogOut = () => {
        console.log("log out")
        // check to see if a token exists in local storage
        if (localStorage.getItem('jwt')) {
            // if so, delete it 
            localStorage.removeItem('jwt')
            navigate('/')
        }

    }

    // useEffect(() => {
    //     if (localStorage.getItem('jwt')) {
    //         const token = localStorage.getItem('jwt')
    //         const decoded = jwt_decode(token)
    //         console.log(decoded)
    //         // renderAddRest = checkAdmin(decoded)
    //         if (decoded.auth = "Admin") {setAdminAuth(true)}
    //     }

    // })


    return (
        <>
            <div
                className='fixed w-full top-0 bg-white z-50'
            >
                <Navbar
                    className="flex justify-between"
                // fluid={true}
                // rounded={true}
                >
                    <Navbar.Brand
                        href="/">
                        {/* <Link to="/"> */}
                        <p>
                            hhqueen
                        </p>
                        {/* </Link> */}
                    </Navbar.Brand>

                    {/* <div>
                    <input />
                    <label></label>
                    <input />
                    <label></label>
                </div> */}



                    {
                        localStorage.getItem('jwt') && jwt_decode(localStorage.getItem('jwt')).auth === "Admin" &&
                        <>
                            <Link
                                to="/addnewrestaurant"
                            >
                                Add New Restaurant
                            </Link>
                        </>
                    }




                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline={true}
                            label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
                        >
                            

                                {
                                    localStorage.getItem('jwt') &&
                                <>
                                <Dropdown.Header>
                                    <span className="block text-sm">
                                        Bonnie Green
                                    </span>
                                    <span className="block truncate text-sm font-medium">
                                        name@flowbite.com
                                    </span>
                                </Dropdown.Header>
                                </>
                            }


                            {
                                !localStorage.getItem('jwt') &&
                                <>
                                    <Link
                                        to="/login"
                                    >
                                        <Dropdown.Item>                                        
                                            Log In
                                        </Dropdown.Item>
                                    </Link>


                                    <Link
                                        to="/signup"
                                    >
                                        <Dropdown.Item>                                        
                                            Sign Up
                                        </Dropdown.Item>
                                    </Link>
                                </>
                            }
                            <Dropdown.Item>
                                Dashboard
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Earnings
                            </Dropdown.Item>
                            <Dropdown.Divider />

                            {
                                localStorage.getItem('jwt') &&
                                // <div
                                //     className='flex'
                                // >
                                //     <p
                                //         onClick={handleLogOut}
                                //     >
                                //         Log Out
                                //     </p>
                                <Dropdown.Item
                                    onClick={handleLogOut}
                                >
                                    Sign out
                                </Dropdown.Item>
                                // </div>
                            }



                        </Dropdown>

                    </div>
                </Navbar>
            </div>
        </>
    )
}
