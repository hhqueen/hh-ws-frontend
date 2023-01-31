const qStringfromObj = (queryObj, startingString = "" ) => {
    console.log("qStringfromObj: checking inputs")
    if (typeof queryObj !== "object") return "error, frist variable not an object"
    if (typeof startingString !== "string") return "error, second variable not a string"
    
    console.log("qStringfromObj: init")
    let queryString = ""

    if (startingString.length > 0) {queryString = startingString}
    console.log("qStringfromObj: checking for ? character")
    if (!startingString.includes("?")) {
        console.log("qStringfromObj: ? character not found, adding")
        queryString = "?" + queryString
    }

    Object.entries(queryObj).forEach((param) => 
        {queryString += `&${param[0]}=${param[1]}`
    })
    
    return queryString
}

export default qStringfromObj