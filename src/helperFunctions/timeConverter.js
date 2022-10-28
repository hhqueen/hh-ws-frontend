// import date from "date-and-time"
const date = require('date-and-time');
const timeConverter = () =>{
    const timeString = "21:45"
    // const parsedHour = date.transform(timeString, "HH:mm A","H")
    // console.log(parsedHour)
    // const parsedMinute = date.transform(timeString, "HH:mm A","mm")
    // console.log(parsedMinute)
    const parsedAMPM = date.transform(timeString, "HH:mm","hh:mm A")
    console.log(parsedAMPM)

    // const now = new Date()
    // const parsedNow = date.format(now,"hh:mm A")
    // console.log(parsedNow)
}

timeConverter()