import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import useCheckAuth from './useCheckAuth'

export default function useEnforceAuth() {

    const gotAuth = useCheckAuth()
    const {hasJWT,  auth, JWT} = gotAuth

    const navigate = useNavigate()
    useEffect(()=>{
        // if(!hasJWT){
        //     navigate("/login")
        // }
        // if(auth !== "Admin"){
        //     navigate("/login")
        // }
        console.log("JWT", gotAuth)
    },[gotAuth])
    
    // getGeoLocation()
    // console.log("getGeoLocation_location:",location)
    return 
}