

const geoLocation = () => {
    let geoLocCoords = {
        geoLocAvail: null,
        latitude:0,
        longitude:0
    }
    if ("geolocation" in navigator) {
        console.log("Available");
        geoLocCoords.geoLocAvail = true
      } else {
        console.log("Not Available");
        geoLocCoords.geoLocAvail = false
      }
    
    
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        geoLocCoords.latitude = position.coords.latitude
        console.log("Longitude is :", position.coords.longitude);
        geoLocCoords.longitude = position.coords.longitude
      });
    
    return geoLocCoords
}

module.exports = geoLocation;