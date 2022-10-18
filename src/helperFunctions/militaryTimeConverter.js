// converts a value bewteen 0 and 24 
const militaryTimeConverter = (value) => {
    if (value < 0 || value > 24) {
      return "Error, input value out of range (should be betwen 0 to 24)"
    }
     
    let timeString = ""

    let ampm = ""
    //calculate AM/PM
    if (value >= 0 && value < 12) {
      ampm = "AM"
    } else if (value >= 12 && value < 24 ) {
      ampm = "PM"
    } else if (value == 24) {
      ampm = "AM"
    }
    console.log("ampm:",ampm)

    let minute = 0 // default 0
    //calculate minute
    if (value % 1 != 0){
      minute = Math.floor((value % 1)*60)
      value = value - value % 1
    } 
    if (minute < 10) {
      minute = `0${minute}`
    }
    console.log("minute:",minute)
    
    
    //calculate hour
    let hour = 0
    if (value > 12){
      hour = value - 12
    } else {
      hour = value
    }
    if (hour < 10) {
      hour = `0${hour}`
    }
    console.log("hour",hour)

    // need to add code to convert and return a string
    timeString = `${hour}:${minute}${ampm}`
    console.log(timeString)
    return timeString

  }

  module.exports = militaryTimeConverter;