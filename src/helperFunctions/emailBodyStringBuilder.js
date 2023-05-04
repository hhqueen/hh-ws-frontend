const emailBodyStringBuilder = (stringArr) => {// implented per Feature# 75
    const newLineString = '%0D'
    let formattedString = stringArr[0]
    for(let i=1;i<stringArr.length;i++){
        formattedString+=newLineString+stringArr[i]
    }
    return formattedString
}

module.exports = {emailBodyStringBuilder}