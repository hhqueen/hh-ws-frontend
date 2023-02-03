import qStringfromObj from "./qStringfromObj"
import axios from 'axios'
import jwtdecode from "jwt-decode"

// WIP Function - B.Lu 02feb2023
const apiLoggerWithObj= async ({httpMethod = "post", serverUrl = process.env.REACT_APP_SERVER_URL , controllerString = "apiLogs", qObj = {}}) => {
    try {
        // const queryObj = {
        //     UI_ElementName: e.target.name || e.target.parentElement.name || null,
        //     UI_ElementId: e.target.id || e.target.parentElement.id  || null ,
        //     UI_ElementValue: e.target.value || null,
        //     UI_ElementChecked: e.target.checked || null ,
        //     UI_ComponentName: componentName,
        //     userId: localStorage.getItem("jwt") ? jwtdecode(localStorage.getItem("jwt")) : null
        // }

        // if there is no userId property in qObj, will check localstorage for userId.
        if (!qObj.userId) { Object.assign(qObj,{userId: localStorage.getItem("jwt") ? jwtdecode(localStorage.getItem("jwt")).id : null}) }

        // build query string
        const queryString = qStringfromObj(qObj)

        // console.log("apiLogger_queryString:", queryString)

        // execute api call with provided variables
        const apiLogResponse = await axios[httpMethod](`${serverUrl}/${controllerString}${queryString}`)
        // console.log("apiLogger_apiLogResponse:",apiLogResponse)
        return apiLogResponse
    } catch (error) {
        console.log(error)
    }
}

export default apiLoggerWithObj