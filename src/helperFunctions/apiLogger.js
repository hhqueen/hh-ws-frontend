import qStringfromObj from "./qStringfromObj"
import axios from 'axios'
import jwtdecode from "jwt-decode"
// const { qStringfromObj } = require('./qStringfromObj.js')
// const axios = require('axios')

const apiLogger = async ( 
        e, 
        componentName = null, 
        elementId = null,
    ) => {
    try {
        // console.log("apiLogger_e", e)
        // console.log("apiLogger_componentName", componentName)
        // console.log("apiLogger_userId", userId)
        const queryObj = {
            UI_ElementName: e.target.name || e.target.parentElement.name || null ,
            UI_ElementId: e.target.id || e.target.parentElement.id || elementId,
            UI_ElementValue: e.target.value,
            UI_ElementChecked: e.target.checked,
            UI_ComponentName: componentName,
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