const geoLocation = async () => {
    return new Promise((res,rej)=>{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
        } else {
          console.log("Sorry, your browser does not support HTML5 geolocation.");
        }
        
        function success(position) {
          const returnCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          res(returnCoords)
        }

        function error(error) {
          console.log("Sorry, we can\'t retrieve your local weather without location permission.");
        }
    
      })   
}

// module.exports = geoLocation;
export default geoLocation