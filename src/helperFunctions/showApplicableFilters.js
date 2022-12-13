import { checkboxFilters } from "../sourceData/filters"

const showApplicableFilters = (passedArr) => {
    let applFilterArr = []
    // checkboxFilters.forEach((filter) => {
    //   if (restData.filterParams[filter.name]) {
    //     applFilterArr.push(filter.display)
    //   }
    // })
    passedArr.filter((item)=>{
      return item.value === true
    }).forEach((item) =>{
      applFilterArr.push(item.display)
    })
    let filterString = applFilterArr.join(", ")
    // console.log("filterString:",filterString)
    // setFilterString(filterString)
    return filterString
  }

  export default showApplicableFilters;