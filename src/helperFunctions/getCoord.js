const axios = require("axios")

const getCoord = async (address) => {
    try {
        // query params
        const params = {
            access_key:process.env.POSITION_STACK_API_KEY,
            query: address,
            output: "json",
            country: "US",
        }

        // initalize query string
        let queryString = ""

        // maps params Objs into query string
        Object.entries(params).map((param,idx)=>{
            if (idx > 0) queryString += "&"
            queryString += `${param[0]}=${param[1]}`
        })
        
        // initialize url for axios
        const url = `http://api.positionstack.com/v1/forward?${queryString}`
        const response = await axios.get(url)

        // return data in form of array
        return response.data
    } catch (error) {
        console.log(error)
        return error
    }
}

// module.exports = getCoord;
export default getCoord