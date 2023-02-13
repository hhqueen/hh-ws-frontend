const axios = require('axios');

async function geoForward (address) {
    try {
      console.log("execute geoForward")
    
    var config = {
      method: 'get',
    maxBodyLength: Infinity,
      url: `https://api.radar.io/v1/geocode/forward?query=${address}`,
      headers: { 
        'Authorization': process.env.REACT_APP_RADAR_CLIENT_API
      }
    };

    const radarResponse = await axios(config)
    return radarResponse.data.addresses
    } catch (error) {
        console.log(error)
    }
}

export default geoForward