const dateConverter = (value, numToDay) => {
    if (numToDay === true) {
      let day = ""
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
          day = "Sunday";
          break;
        case 6:
          day = "Saturday";
        default:
          day = "error";
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
        case "Sunday":
          num = 5;
          break;
        case "Saturday":
          num = 6;
        default:
          num = -1;
      }
      return num

    }

  }

  // module.exports = dateConverter;
  export default dateConverter;