import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalStateContext } from '../context/GlobalStateContext'
import jwtDecode from 'jwt-decode'

export default function AuthCheckWrapper({ minAuth = "User", requireAuth = true, children }) {
    // const { userInfo, jwtToken } = useContext(GlobalStateContext)
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
            setRenderComp(true)
        }
    })

    if(!renderComp) return 
    return (
        <>
            {children}
        </>
    )
}
