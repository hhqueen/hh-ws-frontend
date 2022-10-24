// import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
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

                {/* <div>
                    <input />
                    <label></label>
                    <input />
                    <label></label>
                </div> */}

                {
                    !localStorage.getItem('jwt') &&
                    <>
                        <Link
                            to="/signup"
                        >Sign Up</Link>
                        <Link
                            to="/login"
                        >Log In</Link>
                    </>
                }

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
                
                
                {localStorage.getItem('jwt') &&

                    <div
                        className='flex'
                    >
                        

                        <p
                            onClick={handleLogOut}
                        >
                            Log Out
                        </p>
                    </div>
                }
            </nav>
        </>
    )
}
