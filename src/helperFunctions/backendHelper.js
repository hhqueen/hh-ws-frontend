import axios from "axios";

//     const getString = `${process.env.REACT_APP_SERVER_URL}/restaurants${queryString}`

const callServer = async ({
    method="get", 
    serverUrl = process.env.REACT_APP_SERVER_URL, 
    route = "", 
    qString = "", 
    qObj = {},
    reqBody = {},
    justData = false
}) =>{
    let response 
    if(route[0] !== "/") {
        route = "/" + route
    }
    if(method == "get") {
        response = await axios["get"](`${serverUrl}${route}${qString}`)
    } else {
        response = await axios[method](`${serverUrl}${route}${qString}`,reqBody)

    }
    return justData ? response.data : response
}

export default callServer;