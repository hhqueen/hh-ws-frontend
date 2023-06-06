import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useImmer } from 'use-immer'
import Profile from './Profile'
import LoadingComp from '../../Shared/LoadingComp'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Profile_v1 from './Profile_v1'

export default function ProfileContainer({mainDivStyle}) {

    const labelStyle = 'flex'
    const [userData, setUserData ] = useImmer({})
    const [profileState, setProfileState] = useImmer([
        {
            id:"firstName",
            displayName:"First Name",
            value:"",
            checked: false,
            inputType:"text",
            labelClassName: "",
            inputClassName: "",
            disabled: false,
            required: false,
            onChange: handleChange,
        },
        {
            id:"lastName",
            displayName:"Last Name",
            value:"",
            checked: false,
            inputType:"text",
            labelClassName: "",
            inputClassName: "",
            disabled: false,
            required: false,
            onChange: handleChange,
        },
        {
            id:"email",
            displayName:"Email",
            value:"",
            checked: false,
            inputType:"text",
            labelClassName: "",
            inputClassName: "",
            disabled: true,
            required: false,
            onChange: handleChange,
        },
        {
            id:"currentpassword",
            displayName:"Current Password",
            value:"",
            checked: false,
            inputType:"password",
            labelClassName: "",
            inputClassName: "",
            disabled: false,
            required: false,
            onChange: handleChange,
        },
        {
            id:"password1",
            displayName:"New Password",
            value:"",
            checked: false,
            inputType:"password",
            labelClassName: "",
            inputClassName: "",
            disabled: false,
            required: false,
            onChange: handleChange,
        },
        {
            id:"password2",
            displayName:"Retype New Password",
            value:"",
            checked: false,
            inputType:"password",
            labelClassName: "",
            inputClassName: "",
            disabled: false,
            required: false,
            onChange: handleChange,
        },
        {
            id:"emailSubbed",
            displayName:"Subscribed to Email List",
            value:"",
            checked: false,
            inputType:"checkbox",
            labelClassName: "flex",
            inputClassName: "mx-5 text-center",
            disabled: false,
            required: false,
            onChange: handleChange,
        },
    ])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        console.log("ProfileState:", profileState)
    },[profileState])


    async function getProfile(){
        try {
            console.log("getting profile")
            let decoded
            if (localStorage.getItem('jwt')) {
                decoded = jwt_decode(localStorage.getItem('jwt'))
                setUserData(data => data = decoded)
            } else {
                return navigate('/')
            }
            const gotProfile = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/profile/${decoded.id}`)
            console.log("gotprofile data:",gotProfile.data)
            // setProfileData(gotProfile.data)
            setProfileState(draft=>{
                const gotProfileEntries = Object.entries(gotProfile.data)
                gotProfileEntries.forEach(entry=>{
                    const foundSetting = draft.find(item=>item.id == entry[0])
                    if(foundSetting !== undefined){
                        // console.log("foundSetting:",foundSetting)
                        foundSetting[foundSetting.inputType == "checkbox" ? "checked" : "value"] = entry[1]
                    }
                })
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        getProfile()
    },[])

    // profile_v1 functions

    function handleChange (e) {
        setProfileState((draft)=>{
            const foundSetting = draft.find(item=>item.id == e.target.id)
            if(foundSetting.inputType == "checkbox"){
                foundSetting.checked = e.target.checked
            } else {
                foundSetting.value = e.target.value
            }
        })
    }

    async function handSubmit () {
        // const reqBody = new Map()
        // profileState.forEach(item => {
        //     reqBody.set(item.id, item.inputType == "checkbox" ? item.checked : item.value)
        // })
        // console.log("reqBody Map", reqBody)

        let reqBodyObj = {}
        profileState.forEach((item)=>{
            reqBodyObj[item.id] = item.inputType == "checkbox" ? item.checked : item.value
        })
        console.log("reqBodyObj", reqBodyObj)
        const postProfileData = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/profile/${userData.id}`, reqBodyObj)
        getProfile()
    }

    if(isLoading) return <LoadingComp/>
    return (
    <>
        <div
            style={mainDivStyle}
        >
            {/* <Profile
                profileData={profileData}
                handleProfileSubmit={handleProfileSubmit}
                handleProfileDataOnChange={handleProfileDataOnChange}
                handlePasswordStateOnChange={handlePasswordStateOnChange}
                passwordState={passwordState}
            /> */}
            <Profile_v1
                profileState={profileState}
                handleSubmit={handSubmit}
            />  
        </div>
    </>
  )
}
