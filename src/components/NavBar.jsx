import { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Dropdown, Avatar } from 'flowbite-react'
import jwt_decode from 'jwt-decode'
import { useImmer } from 'use-immer'

const emptyUserInfo = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "id": "",
}

export default function NavBar() {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useImmer(emptyUserInfo)
    // function to remove token for logging out here
    const handleLogOut = () => {
        console.log("log out")
        // check to see if a token exists in local storage
        if (localStorage.getItem('jwt')) {
            // if so, delete it 
            localStorage.removeItem('jwt')
            navigate('/')
        }
        setUserInfo(emptyUserInfo)

    }
    // console.log("navbar useEffect1")
    useEffect(() => {
        // console.log("navbar useEffect")
        if (localStorage.getItem('jwt')) {
            const token = localStorage.getItem('jwt')
            const decoded = jwt_decode(token)
            console.log("decoded",decoded)
            setUserInfo((draft)=>{
                draft.firstName = decoded.firstName
                draft.lastName = decoded.lastName
                draft.email = decoded.email
                draft.id = decoded.id
            })
            // renderAddRest = checkAdmin(decoded)
        }
    })


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

                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline={true}
                            label={
                                <Avatar
                                    placeholderInitials={localStorage.getItem('jwt') && `${userInfo.firstName[0]}${userInfo.lastName[0]}`}
                                    rounded={true}
                                />}
                        >


                            {
                                localStorage.getItem('jwt') &&
                                <>
                                    <Dropdown.Header>
                                        <span className="block text-sm">
                                            {`${userInfo.firstName} ${userInfo.lastName}`}
                                        </span>
                                        <span className="block truncate text-sm font-medium">
                                            {userInfo.email}
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
                            {
                                localStorage.getItem('jwt') && jwt_decode(localStorage.getItem('jwt')).auth === "Admin" &&
                                <>
                                    <Link
                                        to="/addnewrestaurant"
                                    >
                                        <Dropdown.Item>
                                        Add New Restaurant
                                        </Dropdown.Item>
                                    </Link>
                                </>
                            }
                            {/* <Dropdown.Item>
                                Dashboard
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Item>
                                Earnings
                            </Dropdown.Item>
                            <Dropdown.Divider /> */}

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
