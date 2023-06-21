// converts a value bewteen 0 and 24 
const militaryTimeConverter = (value, outputVal = 0, displayString = 0) => {
  // outputVal = 1: 12-hour time + AM/PM
  // outputVal = 0: military time
  // standardFormat = 
  // console.log("outputVal",outputVal)
    if (value < 0 || value > 24) {
      return "Error, input value out of range (should be betwen 0 to 24)"
    }
    if (!outputVal === 1 || !outputVal === 0) {
    // if (outputVal !== 1 || outputVal !== 0) {
      let outputValErrorMsg = `Error, output Val is ${outputVal} but needs to be 1 or 0. outputVal = 1: 12-hour time + AM/PM. outputVal = 0: military time.`
      console.log(outputValErrorMsg)
      return outputValErrorMsg
    }
     
    let timeString = ""

    let ampm = ""
    //calculate AM/PM
    if (value >= 0 && value < 12) {
      ampm = "AM"
    } else if ((value >= 12 && value < 24) ) {
      ampm = "PM" 
    } 
    // console.log("ampm:",ampm)

    let minute = 0// default 0
    let minuteString = ""
    //calculate minute
    if (value % 1 !== 0){
      minute = Math.floor((value % 1)*60)
      // console.log("minute if 1")
      value = value - value % 1
      minuteString = String(minute)
    } 
    if (minute < 10) {
      minuteString = `0${minute}`
      // console.log("minute if 2")
    }
    // console.log("minute:",minute)
    
    
    //calculate hour
    let hour = value
    if(outputVal === 1) {
      if (value > 12){
        hour = value - 12
      } else if (value > 0 && value <= 12) {
        hour = value
      } else if( value === 0 ) {
        hour = 12
      }
    }
    if (hour < 10) {
      hour = `${hour}`
    }
    // console.log("hour",hour)

    // need to add code to convert and return a string
    // timeString = `${hour}:${minute} ${ampm}`
    if(displayString == 1) {
      // for displaying abreviated time on card and detail page
      if(minute == 0) {
        timeString = `${hour}`
      } else {
        timeString = `${hour}:${minuteString}`
      }
    } else {
      // time string for time inputs (addedit restaurant page)
      timeString = `${hour}:${minuteString}`
    }

    // if(standardFormat !== 0) {
    //   timeString = `${hour}:${minuteString}`
    // }
    
    if(outputVal === 1) {
      timeString = `${timeString}${ampm}`
    }
    // console.log("timeString",timeString)
    return timeString

  }
// module.exports = militaryTimeConverter;
  export default militaryTimeConverter