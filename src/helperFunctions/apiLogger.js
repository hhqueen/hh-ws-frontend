import qStringfromObj from "./qStringfromObj"
import axios from 'axios'
import jwtdecode from "jwt-decode"
// const { qStringfromObj } = require('./qStringfromObj.js')
// const axios = require('axios')

const apiLogger = async ({ 
        e = null, 
        componentName = null, 
        elementId = null,}
    ) => {
    try {
        // console.log("apiLogger_e", e)
        // console.log("apiLogger_componentName", componentName)
        // console.log("apiLogger_userId", userId)
        const queryObj = {
            UI_ElementName: e ? e.target.name || e.target.parentElement.name : null ,
            UI_ElementId: e ? e.target.id || e.target.parentElement.id : elementId,
            UI_ElementValue: e ? e.target.value : null,
            UI_ElementChecked: e ? e.target.checked : null,
            UI_ComponentName: componentName,
            screenWidth: window.innerWidth,
            screenHeight: window.screenHeight,
            userId: localStorage.getItem("jwt") ? jwtdecode(localStorage.getItem("jwt")).id : null
        }
        // console.log("apiLogger_queryObj:", queryObj)
        
        const queryString = qStringfromObj(queryObj)
        // console.log("apiLogger_queryString:", queryString)
        const apiLogResponse = await axios.post(`${process.env.REACT_APP_SERVER_URL}/apiLogs${queryString}`)
        // console.log("apiLogger_apiLogResponse:",apiLogResponse)
        return apiLogResponse
    } catch (error) {
        console.log(error)
    }
}

export default apiLogger;
// export {apiLogger, apiLoggerWithObj};