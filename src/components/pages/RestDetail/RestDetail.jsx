// libaries
import { useState, useLayoutEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import showApplicableFilters from "../../../helperFunctions/showApplicableFilters"
import { siteSettings } from "../../../sourceData/siteSettings"
import axios from "axios"
import apiLogger from '../../../helperFunctions/apiLogger'
import qStringfromObj from '../../../helperFunctions/qStringfromObj'
import jwtDecode from 'jwt-decode'
import visitorActivityLogger from '../../../helperFunctions/visitorActivityLogger'

// partials
import HHHoursContainer from '../../Shared/HHHours/HHHoursContainer'
import MenuItems from '../../MenuItems'
import LoadingComp from '../../Shared/LoadingComp'
import EditDeleteRestComp from '../../EditDeleteRestComp'
import TitleCuisineFilters from './partials/TitleCuisineFilters'
import AddressPhoneNumber from './partials/AddressPhoneNumber'
import MenuTabsContainer from './partials/MenuTabs/MenuTabsContainer'

// import context
import { GlobalStateContext } from '../../context/GlobalStateContext'

export default function RestDetail({ mainDivStyle }) {
  let { id } = useParams()
  const GlobalStateVar = useContext(GlobalStateContext)
  // console.log("rest_detail GlobalStateVar", GlobalStateVar)
  const componentName = "RestDetail"
  const menuImgClassName = 'w-[800px] max-w-full'

  const emailProps = {
    email: "hhqueen.official@gmail.com",
    subject: `Restaurant Information is Wrong! id: ${id}`,
    body: "Please tell us what is wrong:"
  }

  const [restData, setRestData] = useState({
    hourSet: {
      hours: []
    },
    cuisines: [],
    menu: {
      foodSpecialsDescription: "",
      drinkSpecialsDescription: "",
      foodMenu: [],
      drinkMenu: [],
      foodAndDrinkMenuImg: null,
      foodMenuImg: null,
      drinkMenuImg: null
    }
  })
  const [isLoaded, setIsloaded] = useState(false)
  const [address, setAddress] = useState("")

  const dateString = (dateTime) => {
    const updatedDate = dateTime
    const year = updatedDate.substring(0, 4)
    const month = updatedDate.substring(5, 7)
    const day = updatedDate.substring(8, 10)
    return `${month}/${day}/${year}`
  }

  const dateObjToString = (obj) => {
    return `${obj.month}/${obj.day}/${obj.year}`
  }

  const dateStringToObj = (dateTime) => {
    const updatedDate = dateTime
    const year = Number(updatedDate.substring(0, 4))
    const month = Number(updatedDate.substring(5, 7))
    const day = Number(updatedDate.substring(8, 10))
    return {
      year,
      month,
      day
    }
  }

  const getLargestDateObj = (dateObjArr) => {

    // init low point
    let dateObj = {
      year: 0,
      month: 0,
      day: 0
    }

    // check if input is array
    if (!Array.isArray(dateObjArr)) {
      return new Error("Input Variable is not an Array")
    }

    // loop thru date obj array

    for (let idx = 0; idx < dateObjArr.length; idx++) {
      let dateObjGreaterThanEle = true

      const ele = dateObjArr[idx]
      // check if element is not object or null
      let eleType = typeof ele
      if (!eleType == "object" || ele == null) {
        const errorMessage = `Array[${idx}] is not an object`
        console.log(errorMessage)
        return new Error(errorMessage)
      }
      // check if key lenght = 3 AND if key names are year, month, day
      const keyArr = Object.keys(ele)
      let keysValid = true
      let keysArrCheckVals = ["year", "month", "day"]
      keysArrCheckVals.forEach((val) => {
        if (!keysArrCheckVals.includes(val)) { keysValid = false }
      })
      if (keyArr.length !== 3 || !keysValid) {
        const errorMessage = `Array[${idx}] key error, should be year, month, day, CASE SENSITIVE`
        console.log(errorMessage)
        return new Error(errorMessage)
      }

      if (dateObjGreaterThanEle && (Number(ele.year) < Number(dateObj.year))) {
        dateObjGreaterThanEle = false
        idx++
      }

      // check if month is smaller and skip if so
      let checkday = false
      if (dateObjGreaterThanEle && (Number(ele.month) < Number(dateObj.month))) {
        dateObjGreaterThanEle = false
        idx++
      } else if (dateObjGreaterThanEle && (Number(ele.month) == Number(dateObj.month))) {
        // if the month is the same, then check the day
        checkday = true
      }


      if (checkday) {
        // check if day is same/eq or smaller
        // console.log(`idx:${idx} comparing day: ele:${ele.day} ? dateObj:${dateObj.day}`)
        if (
          dateObjGreaterThanEle
          && (Number(ele.day) <= Number(dateObj.day))) {
          // console.log(`idx:${idx} day: ${ele.day} <= ${dateObj.day}, skipping`)
          dateObjGreaterThanEle = false
          idx++
        }
      }


      // if passes all checks, set dateObj with ele dateObj
      if (dateObjGreaterThanEle) {
        // console.log(`ele > dateObj, setting new datObj with:`, ele)
        dateObj = ele
      }

    }
    return dateObj
  }

  const getAllUpdateDatesAndCheckLargest = (obj) => {
    // define empty array to return
    let updatedDateArr = []
    const recurseAll = (obj) => {
      if (typeof obj == "object" && obj !== null) {
        if (obj.updatedAt) {
          updatedDateArr.push(dateStringToObj(obj.updatedAt))
        }
        const objKeys = Object.entries(obj)
        objKeys.forEach((keyVal) => {
          // console.log("key:", keyVal)
          const keyType = typeof keyVal[1]
          if (keyType == "object" && keyVal[1] !== null) {
            return recurseAll(keyVal[1])
          }

          if (Array.isArray(keyVal[1])) {
            keyVal[1].forEach((keyValArr) => {
              return recurseAll(keyValArr[1])
            })
          }
        })
      }
    }
    recurseAll(obj)
    // console.log("updatedDateArr:", updatedDateArr)
    return getLargestDateObj(updatedDateArr)
  }

  useLayoutEffect(() => {
    console.log(id)
    const getRestData = async () => {
      try {
        const qString = qStringfromObj({
          UI_ComponentName: componentName,
          userId: localStorage.getItem("jwt") ? jwtDecode(localStorage.getItem("jwt")).id : null,
          uad: window.navigator.userAgent,
          mobile: window.navigator.userAgentData?.mobile,
          browser: window.navigator.userAgentData?.brands[1]?.brand,
          OS: window.navigator.userAgentData?.platform,
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
          restaurantId: id,
          windowNav: JSON.stringify(window.navigator)
        })
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants/page/${id}${qString}`)
        console.log("async data", response.data)
        setRestData(data => data = response.data)
        setAddress(`${response.data.address1} ${response.data.city} ${response.data.state} ${response.data.zip_code}`)

        await visitorActivityLogger({
          restaurantId: id,
          elementId: "va2",
          message: `User visited restaurantId: ${id} ${response.data.name}`,
          url: window
        })

        setIsloaded(true)
      } catch (error) {
        console.log(error)
      } finally {

      }
    }
    getRestData()
  }, [id])


  // format main info (restaurant name, cusine, filters, address/phonenumber and hours)
  const addressPhoneNumComp = <AddressPhoneNumber
    address={address}
    addressHref={`https://www.google.com/maps/place/${address.replace(" ", "+")}`}
    addressClassName='text-[blue] underline'
    phoneNum={restData?.displayNumber}
    phoneNumHref={`tel:${restData?.telNumber}`}
    phoneNumClassName='text-[blue] underline'
  />

  const titleCuisineFiltersComp = <TitleCuisineFilters
    containerDivClassName='ml-3'
    name={restData?.name}
    nameClassName='font-bold'
    cuisines={restData?.cuisines.join(", ")}
    cuisinesClassName='italic py-1'
    filters={showApplicableFilters(restData?.filterParams ?? [])}
    filtersClassName=""
  />

  const imgComp = <div
    className='md:w-[35vw]'
  >
    {/* updated img height to 250px per bug #9 */}
    <img
      className='max-h-[250px] object-cover md:w-full md:max-h-[300px] md:object-cover'
      src={restData?.image_url}
      alt={restData?.name} />
    <EditDeleteRestComp
      id={restData._id}
    />
  </div>

  const hoursContainerComp = <div>
    {/* Hour Header */}
    <HHHoursContainer
      timeOutputVal={1}
      hourSet={restData.hourSet}
    />
  </div>

  let mainInfoComp = <></>

  if (GlobalStateVar.isMobile === true) {

    mainInfoComp = <>
      <div
        className='flex md:flex md:px-10'
      >
        {imgComp}
        {titleCuisineFiltersComp}

      </div>
      <div
        className='mx-3 w-full md:w-fit'
      >
        {addressPhoneNumComp}
        {hoursContainerComp}
      </div>
    </>

  } else {

    mainInfoComp = <>
      <div
        className='flex md:flex md:px-10'
      >
        {imgComp}
        <div
          className='ml-3'
        >
          {titleCuisineFiltersComp}
          {addressPhoneNumComp}
          {hoursContainerComp}
        </div>

      </div>
    </>

  }

  if (!isLoaded) return <LoadingComp />
  return (

    <>
      {/* {!isLoaded && <LoadingComp />} */}
      {/* {
        isLoaded && */}

      <div
        style={mainDivStyle}
        className='mx-5 md:flex md:flex-col mt-[200px] md:items-center'
      >

        {mainInfoComp}

        <MenuTabsContainer
          menu={restData?.menu}
          containerClassName="my-10"
        />

        {/* <div
          className='w-full flex flex-col md:flex-row'
        >
          {
            restData?.menu?.isFoodAndDrinkMenu &&
            <>
              <div
                className='flex flex-col items-center justify-center py-3 w-full'>
                <p
                  className='border-b'
                >Food And Drink Menu</p>
                <img
                  className={menuImgClassName}
                  src={`${restData?.menu?.foodAndDrinkMenuImg?.imgUrl}`}
                  alt="image"
                />
              </div>
            </>
          }

          {!restData?.menu?.isFoodAndDrinkMenu &&
            <>
              {
                restData?.menu?.foodMenuImg !== null &&

                <div
                  className='flex flex-col items-center justify-center py-3  w-full'>
                  <p
                    className='border-b'
                  >Food Menu</p>
                  {
                    siteSettings.showImgMenu ?
                      <>
                        <img
                          className={menuImgClassName}
                          src={`${restData?.menu?.foodMenuImg?.imgUrl}`}
                          alt="image"
                        />
                      </>
                      :
                      <>
                        <p
                          className='px-10 text-center'
                        >{restData?.menu.foodSpecialsDescription}</p>
                        <MenuItems
                          ItemsArr={restData?.menu.foodMenu}
                          menuType="Food"
                        />
                      </>
                  }
                </div>
              }

              {
                restData?.menu?.drinkMenuImg !== null &&
                <div
                  className='flex flex-col items-center justify-center py-3  w-full'
                >
                  <p
                    className='border-b'
                  >Drink Menu</p>
                  {
                    siteSettings.showImgMenu ?
                      <>
                        <img
                          className={menuImgClassName}
                          src={`${restData?.menu?.drinkMenuImg?.imgUrl}`}
                          alt="image"
                        />
                      </>
                      :
                      <>
                        <p
                          className='px-10 text-center'
                        >{restData?.menu.drinkSpecialsDescription}</p>
                        <MenuItems
                          ItemsArr={restData?.menu.drinkMenu}
                          menuType="Drink"
                        />
                      </>
                  }
                </div>
              }
            </>
          }
        </div> */}


        <div
          className='flex items-center justify-around'
        >
          <div
            className='flex items-center justify-center text-center'
          >
            {/* <p>{`Last Updated: ${dateString(restData.updatedAt)}`}</p> */}
            <p>{`Last Updated: ${dateObjToString(getAllUpdateDatesAndCheckLargest(restData))}`}</p>
          </div>

          <div
            className='flex items-center justify-center text-center'
          >
            <a
              href={`mailto:${emailProps.email}?subject=${emailProps.subject}&body=${emailProps.body}`}
              className="ml-10"
            >
              <p
                className='leading-[18px] text-[15px] text-sky-600 underline'
              >Info on this page is wrong!</p>
            </a>
          </div>

        </div>

      </div>
      {/* } */}
    </>
  )
}
