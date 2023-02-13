const appendSearchHistory = (searchParam, address) => {
    const now = new Date()
    const newEntry = {
        searchTerm: searchParam,
        address: address,
        date_UTC_ISO: now.toUTCString()
    }
    if (localStorage.getItem('sh')) {
        const getHistoryArr = JSON.parse(localStorage.getItem('sh'))
        getHistoryArr.push(newEntry)
        if (getHistoryArr.length > 3) {
            getHistoryArr.shift()
        }
        localStorage.setItem('sh', JSON.stringify(getHistoryArr))
        console.log("getHistoryArr:", localStorage.getItem('sh'))
    } else {
        const newHistoryArr = [newEntry]
        localStorage.setItem('sh', JSON.stringify(newHistoryArr))
        // console.log("newHistoryArr:",localStorage.getItem('sh'))
    }
}

export default appendSearchHistory