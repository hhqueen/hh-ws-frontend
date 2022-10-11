const axios = require("axios")

const getCoord = async (address) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=${process.env.REACT_APP_POS_STACK_API}&query=${address}&output=json`
    const response = await axios.get(url)
    console.log(response.data.data[0])
    const coordinates = {
        location: response.data.data[0].label,
        latitude: response.data.data[0].latitude,
        longitude: response.data.data[0].longitude
    }
    // console.log(coordinates)
    return coordinates
}

module.exports = getCoord;