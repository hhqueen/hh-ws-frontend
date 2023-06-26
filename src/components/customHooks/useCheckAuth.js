import {useEffect, useState} from 'react'
import {useImmer} from "use-immer"
import jwtDecode from 'jwt-decode'

export default function useCheckAuth() {
    const [JWT, setJWT] = useImmer(localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")) : {})
    const [hasJWT, setHasJWT] = useState(false)
    const [auth, setAuth] = useImmer("")
    const [authIsGreaterThanUser, setAuthIsGreaterThanUser] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    
    const getDecodedJWT = () =>{
        return jwtDecode(localStorage.getItem("jwt"))
    }
    
    useEffect(()=>{
        const handleStorageChange = () => {
            console.log("localstorage change")
            if(localStorage.getItem("jwt")) {
                setHasJWT(true)
                // console.log("has JWT: true")
                const decodedJWT = getDecodedJWT()
                setJWT(decodedJWT)
                setAuth(decodedJWT.auth ?? "error, auth key not present in jwt token")
                if(decodedJWT.auth == "Admin") {
                    setAuthIsGreaterThanUser(true)
                }
             } else {
                console.log("has JWT: false")
                setHasJWT(false)
                setJWT({})
                setAuthIsGreaterThanUser(false)
                setAuth("")
            }
        }
        handleStorageChange()
        // window.addEventListener('storage', handleStorageChange)
        // return ()=>{return window.removeEventListener('storage', handleStorageChange)}
    },[])

    return {hasJWT, JWT, auth, authIsGreaterThanUser}
}