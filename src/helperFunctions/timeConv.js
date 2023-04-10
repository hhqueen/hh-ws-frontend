// This function file is in WIPPPPPP

// function to convert military time number value to standard (12 hour) string time value 
function tc_milNum_To_StdStr(number = null, abreviated = false) {
    if(number === null) return `Error: no number value was passed to function, expecting a value`
    
    const numberType = typeof number
    if(numberType !== "number") return `Error: passed variable type is ${numberType}, expecting a number`

    if (number < 0 || number > 24) return "Error, input value out of range (should be betwen 0 to 24)"


}

// function to convert military time number value to miltiary string time value 
function tc_milNum_To_MilStr(number = null) {

}

// function to convert military string time value to miltary number value
function tc_milStr_To_MilNum(string = null) {
    
}




module.exports = {
    tc_milNum_To_StdStr,
    tc_milNum_To_MilStr,
    tc_milStr_To_MilNum
}