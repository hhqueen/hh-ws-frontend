const qStringfromObj = (queryObj, startingString = "" ) => {
    if (typeof queryObj !== "object") return "error, frist variable not an object"
    if (typeof startingString !== "string") return "error, second variable not a string"

    let queryString = ""
    if (startingString.length > 0) {queryString = startingString}
    if (!startingString.includes("?")) {
        queryString = "?" + queryString
    }

    Object.entries(queryObj).forEach((param) => 
        {queryString += `&${param[0]}=${param[1]}`
    })
    
    return queryString
}

export default qStringfromObj