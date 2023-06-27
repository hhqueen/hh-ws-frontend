import qStringfromObj from "./qStringfromObj"
import callServer from "./backendHelper"
import jwtDecode from "jwt-decode"

const visitorActivityLogger = async ({
    elementId,
    restaurantId,
    value,
    message,
    url
}) => {
    let response 
    try {
        const queryObj = {
            userId: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).id : null,
            restaurantId: restaurantId ?? null,
            elementId: elementId ?? null,
            value: value ?? null,
            message: message ?? null,
            url: window.location.href ?? null
        }
        const callProps = {
            route: 'visitorActivity',
            method: 'post',
            // qString: qStringfromObj(queryObj)
            reqBody: queryObj
        }
        response = await callServer(callProps)
        console.log("visitor activity", response)
    } catch (error) {
        console.error("visitorActivityLogger Error:",error)
        response = error
    } finally {
        return response
    }
}

export default visitorActivityLogger;
// export {apiLogger, apiLoggerWithObj};