const geoLocation = async () => {
    return new Promise((res,rej)=>{
        if (navigator.geolocation) {
          const options = {enableHighAccuracy: true}
          navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
          console.log("Sorry, your browser does not support HTML5 geolocation.");
        }
        
        function success(position) {
          const returnCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            permission: true
          }
          res(returnCoords)
        }

        function error(error) {
          console.warn("Error: browser location permission not given");
          rej(error)
        }
    
      })   
}

// module.exports = geoLocation;
export default geoLocation