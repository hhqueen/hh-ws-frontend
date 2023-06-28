import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalStateContext } from '../context/GlobalStateContext'
import jwtDecode from 'jwt-decode'
import callServer from '../../helperFunctions/backendHelper'



export default function AuthCheckWrapper({ minAuth = "User", requireAuth = true, children }) {
    
    // const { userInfo, jwtToken } = useContext(GlobalStateContext)
    const { id } = useParams()
    const [renderComp, setRenderComp] = useState(false)
    const navigate = useNavigate()
    const authRanking = {
        "user": 0,
        "mod": 1,
        "admin": 2
    }

    useLayoutEffect(() => {
        if(requireAuth) {
            const jwtToken = localStorage.getItem("jwt") ?? ""

            if (jwtToken.length === 0) {
                const redirectRoute = "/signup"
                console.log(`jwt length = ${jwtToken.length} redirecting to ${redirectRoute}`)
                return navigate(redirectRoute)
            }
    
            const { auth } = jwtDecode(jwtToken)
            const currentAuthLevel = Number(authRanking[auth.toLowerCase()])
            console.log("currentAuthLevel", currentAuthLevel)
            const minAuthLevel = Number(authRanking[minAuth.toLowerCase()])
            console.log("minAuthLevel", minAuthLevel)
            if (currentAuthLevel < minAuthLevel) {
                const redirectRoute = "/unauthorized"
                console.log(`auth level ${currentAuthLevel} less than ${minAuthLevel} redirecting to ${redirectRoute}`)
                return navigate(redirectRoute)
            }
            // console.log(`no redirect`)
            // setRenderComp(true)
        }
        setRenderComp(true)
    })

    useEffect(()=>{
        const logPageVisit = async () =>{
            console.log("LogPageVisit url", window.location.href)
            try {
                const qObj = {
                    userId: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).id : null,
                    uad: window.navigator.userAgent,
                    mobile: window.navigator.userAgentData?.mobile,
                    browser: window.navigator.userAgentData?.brands[1]?.brand,
                    OS: window.navigator.userAgentData?.platform,
                    screenWidth: window.innerWidth,
                    screenHeight: window.innerHeight,
                    restaurantId: id ?? null,
                    windowNav: JSON.stringify(window.navigator),
                    url:window.location.href
                  }
                // const qString = qStringfromObj(qObj)
                const serverResponse = await callServer({
                    method: "post",
                    route: "/pageVisit/",
                    reqBody: qObj
                })
                console.log("authCheckWrapper LogPageVisit Response:",serverResponse)
            } catch (error) {
                console.log("authCheckWrapper LogPageVisit Error:",error)

            }

        }
        logPageVisit()
    },[window.location.href])

    if(!renderComp) return 
    return (
        <>
            {children}
        </>
    )
}
