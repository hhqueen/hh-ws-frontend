import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useImmer } from 'use-immer'
import Profile from './Profile'
import LoadingComp from '../../Shared/LoadingComp'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default function ProfileContainer({mainDivStyle}) {
    const [profileData, setProfileData] = useImmer({})
    const [passwordState, setPasswordState] = useImmer({
        currentPassword: {
            displayName: "Current Password",
            value: ""
        },
        newPassword: {
            displayName: "New Password",
            value: ""
        },
        retypeNewPassword: {
            displayName: "Re-type New Password",
            value: ""
        }
    })
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    
    useEffect(()=>{
        async function getProfile(){
            try {
                console.log("getting profile")
                let decoded
                if (localStorage.getItem('jwt')) {
                    decoded = jwt_decode(localStorage.getItem('jwt'))
                } else {
                    return navigate('/')
                }
                const gotProfile = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${decoded.id}`)
                console.log(gotProfile.data)
                setProfileData(gotProfile.data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getProfile()
    },[])

    const handleProfileUpdate = async (e) => {
        e.preventDefault()
        try {
            console.log("submit profile update")
            console.log("formsubmit e:", e.target.elements[0].name)
            const formData = Object.entries(e.target.elements)
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleProfileDataOnChange = (e) =>{
        setProfileData((draft)=>{draft[e.target.name] = e.target.value})
    }

    const handlePasswordStateOnChange = (e) =>{
        setPasswordState((draft)=>{draft[e.target.name].value = e.target.value})
    }

    if(isLoading) return <LoadingComp/>
    return (
    <>
        <div
            style={mainDivStyle}
        >
            <Profile
                profileData={profileData}
                handleProfileUpdate={handleProfileUpdate}
                handleProfileDataOnChange={handleProfileDataOnChange}
                handlePasswordStateOnChange={handlePasswordStateOnChange}
                passwordState={passwordState}
            />  
        </div>
    </>
  )
}
