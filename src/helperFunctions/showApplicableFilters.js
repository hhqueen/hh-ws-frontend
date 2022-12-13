const showApplicableFilters = (passedArr) => {
    let applFilterArr = []
    passedArr.filter((item)=>{
      return item.value === true
    }).forEach((item) =>{
      applFilterArr.push(item.display)
    })
    let filterString = applFilterArr.join(", ")
    return filterString
  }

  export default showApplicableFilters;