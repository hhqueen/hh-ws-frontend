const dateConverter = (value, numToDay) => {
    if (numToDay === true) {
      let day = ""
      console.log("dateConverter Value:",value, "dateConverter option", numToDay)
      switch (value) {
        case 0:
          day = "Monday";
          break;
        case 1:
          day = "Tuesday";
          break;
        case 2:
          day = "Wednesday";
          break;
        case 3:
          day = "Thursday";
          break;
        case 4:
          day = "Friday";
          break;
        case 5:
          day = "Saturday";
          break;
        case 6:
          day = "Sunday";
          break;
        default:
          day = "error?";
          break;
      }
      return day

    } else {

      let num = ""
      switch (value) {
        case "Monday":
          num = 0;
          break;
        case "Tuesday":
          num = 1;
          break;
        case "Wednesday":
          num = 2;
          break;
        case "Thursday":
          num = 3;
          break;
        case "Friday":
          num = 4;
          break;
        case "Saturday":
          num = 5;
          break;
        case "Sunday":
          num = 6;
          break;
        default:
          num = -1;
          break;
      }
      return num

    }

  }

  // module.exports = dateConverter;
  export default dateConverter;