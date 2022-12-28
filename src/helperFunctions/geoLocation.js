const geoLocation = async () => {
    let geoLocCoords = {
        geoLocAvail: null,
        latitude:null,
        longitude:null
    }
    if ("geolocation" in navigator) {
        geoLocCoords.geoLocAvail = true
      } else {
        geoLocCoords.geoLocAvail = false
      }
      // console.log("geolocation permission",geoLocCoords.geoLocAvail)
    
      await navigator.geolocation.getCurrentPosition(function(position) {
        // console.log("geoLocation_Latitude is :", position.coords.latitude);
        geoLocCoords.latitude = position.coords.latitude
        // console.log("geoLocation_Longitude is :", position.coords.longitude);
        geoLocCoords.longitude = position.coords.longitude
      });
    // console.log("geoLocCoords:", geoLocCoords)
    return geoLocCoords
}

// module.exports = geoLocation;
export default geoLocation