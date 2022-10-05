// converts a value bewteen 0 and 24 
const militaryTimeConverter = (value) => {
    if (value < 0 || value > 24) {
      return "Error, input value out of range (should be betwen 0 to 24)"
    }
  
    let ampm = ""
    let hour = 0
    let minute = 0
    let timeString = ""
    if (value >= 0 && value < 12) {
      ampm = "AM"
    } else if (value > 12 && value < 24 ) {
      ampm = "PM"
    } else if (value == 24) {
      ampm = "AM"
    }
    
    // need to add code to convert and return a string

    return timeString

  }

  module.exports = militaryTimeConverter;