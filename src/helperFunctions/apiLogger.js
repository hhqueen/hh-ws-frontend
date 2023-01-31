
import qStringfromObj from "./qStringfromObj"
import axios from 'axios'
// const { qStringfromObj } = require('./qStringfromObj.js')
// const axios = require('axios')

const apiLogger = async ( e, componentName, userId = null) => {
    try {
        // console.log("apiLogger_e", e)
        // console.log("apiLogger_componentName", componentName)
        // console.log("apiLogger_userId", userId)
        const queryObj = {
            UI_ElementName: e.target.name || e.target.parentElement.name || null,
            UI_ElementId: e.target.id || e.target.parentElement.id  || null ,
            UI_ElementValue: e.target.value || null  ,
            UI_ElementChecked: e.target.checked || null ,
            UI_ComponentName: componentName,
            userId: userId
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