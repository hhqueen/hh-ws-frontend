

const geoLocation = async () => {
    let geoLocCoords = {
        geoLocAvail: null,
        latitude:0,
        longitude:0
    }
    if ("geolocation" in navigator) {
        geoLocCoords.geoLocAvail = true
      } else {
        geoLocCoords.geoLocAvail = false
      }
      console.log("geolocation permission",geoLocCoords.geoLocAvail)
    
      await navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        geoLocCoords.latitude = position.coords.latitude
        console.log("Longitude is :", position.coords.longitude);
        geoLocCoords.longitude = position.coords.longitude
      });
    
    return geoLocCoords
}

// module.exports = geoLocation;
export default geoLocation