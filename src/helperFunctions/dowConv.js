
// mapping variable
const dowMapping = {
    0: {short:"M",medium:"Mon", long:"Monday"},
    1: {short:"T",medium:"Tues", long:"Tuesday"},
    2: {short:"W",medium:"Wed", long:"Wednesday"},
    3: {short:"Th",medium:"Thurs", long:"Thursday"},
    4: {short:"F",medium:"Fri", long:"Friday"},
    5: {short:"Sa",medium:"Sat", long:"Saturday"},
    6: {short:"Su",medium:"Sun", long:"Sunday"}
}

// function to handle conversion of a number 0-6 and return the day string in short, medium, and long form
function dc_numToStr(
    day = null, 
    strForm = "long" // strForm defaults to "long"
    ){
    
    // check if a value was passed to day variable
    if(day === null) return `Error: no number value was passed to function, expecting a value`

    // day Number Type check
    const dayType = typeof day
    if (dayType !== "number") return `Error: "day" variable type is ${dayType}, expecting a number`

    // check if number is between 0 and 6
    if (day > 6 ) return `Error: "day" value of ${day} is greater than 6`
    if (day < 0 ) return `Error: "day" value of ${day} is less than 0`

    // strForm String Type check
    const strFormType = typeof strForm
    if(strFormType !== "string") return `Error: strForm variable type is ${strFormType}, expecting a String`
    
    // check if strFrom values are "short", "medium", or "long"
    const LC_strForm = strForm.toLowerCase()
    if(LC_strForm !== "short" && LC_strForm !== "medium" && LC_strForm !== "long") return `Error: strForm value is ${strForm}, expecting "short", "medium", or "long" (not case sensitive)`

    // should find correct mapping if it makes it down here
    return dowMapping[day][strForm]
}

// function to handle conversion of the day string in short, med, and long form (autodetect) and return a number 0-6
function dc_StrToNum(str = null){

    // check if a value was passed to str variable
    if(str === null) return `Error: no string value was passed to function, expecting a value`

    // check if str is a String
    const strType = typeof str
    if(strType !== "string") return `Error: str variable type is ${strType}, expecting a string`
    
    // intialize foundNum as -1
    let foundNum = -1

    // map thru all strings to see if it matches dowMapping value
    const dowEntries = Object.entries(dowMapping)
    dowEntries.every((day)=>{
        const foundValue = Object.values(day[1]).map(str => str.toLowerCase()).indexOf(str.toLowerCase())
        if(Number(foundValue) > 0) 
        {
            foundNum = Number(day[0])
            return false
        } else {
            return true
        }
    })
    if (foundNum >= 0) return foundNum
    // returns error if function makes it past the forEach aka doesnt find anything
    return `Error: str value of ${str} is not a valid short, medium, or long form of a week day`
}

// export meeee
module.exports = {
    dc_numToStr,
    dc_StrToNum
}