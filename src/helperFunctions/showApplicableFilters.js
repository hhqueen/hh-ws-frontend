import { checkboxFilters } from "../sourceData/filters"

const showApplicableFilters = (restData) => {
    let applFilterArr = []
    checkboxFilters.forEach((filter) => {
      if (restData.filterParams[filter.name]) {
        applFilterArr.push(filter.display)
      }
    })
    let filterString = applFilterArr.join(", ")
    // console.log("filterString:",filterString)
    // setFilterString(filterString)
    return filterString
  }

  export default showApplicableFilters;