import React, {useState, useEffect} from 'react'
import { useImmer } from 'use-immer'
import axios from 'axios'
import date from 'date-and-time'
import LoadingComp from '../../../LoadingComp'

const headers = [
  "Daily Vistors", "Web", "Mobile", "Registered", "Unregistered"
]

const data1 = [
  "Average Last 7 Days - test", 10, 10, 10, 10
]

const data2 = [
  "Average Last 30 Days - test", 10, 10, 10, 10
]

export default function DailyVisitors() {
  const [rowOne, setRowOne] = useImmer([])
  const [rowTwo, setRowTwo] = useImmer([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const fetchData = async () => {
      try {
        // fetch data
      const fetchedData = await axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics/dailyVistors`)
      // console.log("DailyVisitors_fetchedData",fetchedData)
      const fetchedDataData = fetchedData.data
      // create empty prefilled rowOne array, size header.length
      let rowOneArr = new Array(headers.length)
      // pre-fill out item 0 with "Average Last 7 Days"
      rowOneArr[0] = "Average Last 7 Days"

      // create empty prefilled rowTwo array, size header.length
      let rowTwoArr = new Array(headers.length)
      // pre-fill out item 0 with "Average Last 30 Days"
      rowTwoArr[0] = "Average Last 30 Days"

      const nowDate = new Date()
      const sevenDaysAgo = Date.parse(date.addDays(nowDate, -7))
      const thirtyDaysAgo = Date.parse(date.addDays(nowDate, -30))


      // filter data for last 7 and 30 days
      let lastSevenDaysArr = []
      let lastThirtyDaysArr = []
      fetchedDataData.forEach((vistor)=>{
        // console.log("vistor", vistor)
        // const parsedCreatedAt = date.parse(vistor.createdAt, 'HH:mm:ss [GMT]Z')
        const parsedCreatedAt = Date.parse(vistor.createdAt)
        // console.log("parsed dateTime",parsedCreatedAt)
        if(parsedCreatedAt >= sevenDaysAgo) {
          // console.log(`pushing to seven days Arr`, vistor)
          lastSevenDaysArr.push(vistor)
        }
        if(parsedCreatedAt >= thirtyDaysAgo) {
          // console.log(`pushing to thirty days Arr`, vistor)
          lastThirtyDaysArr.push(vistor)
        }
      })
      
      // console.log("calc", lastSevenDaysArr.filter((item)=>item.modifiedBy !== null || item.modifiedBy !== "null"))

      // calculate average for last 7 days for "Web", "Mobile", "Registered", "Unregistered"
      rowOneArr[1] = 0
      rowOneArr[2] = 0
      rowOneArr[3] = Math.round(lastSevenDaysArr.filter((item)=>item.modifiedBy !== null || item.modifiedBy !== "null").length / 7)
      rowOneArr[4] = Math.round(lastSevenDaysArr.filter((item)=>item.modifiedBy === null || item.modifiedBy === "null").length  / 7)

      // calculate average for last 30 days for "Web", "Mobile", "Registered", "Unregistered"
      rowTwoArr[1] = 0
      rowTwoArr[2] = 0
      rowTwoArr[3] = Math.round(lastThirtyDaysArr.filter((item)=>item.modifiedBy !== null || item.modifiedBy !== "null").length  / 30)
      rowTwoArr[4] = Math.round(lastThirtyDaysArr.filter((item)=>item.modifiedBy === null || item.modifiedBy === "null").length  / 30)
  
      // set rowOne with 7 day avg data
      setRowOne(rowOneArr)
      // set rowTwo with 30 day avg data
      setRowTwo(rowTwoArr)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])

  useEffect(()=>{
    console.log("rowOneArr:",rowOne)
    console.log("rowOneArr:",rowTwo)
  },[rowOne,rowTwo])

  const renderHeaders = (array) => {
    return array.map((item) => {
      return <th className="px-4 py-3">{item}</th>
    })
  }

  const renderData = (array) => {
    return array.map((item) => {
      return (
        <td className="px-4 py-3 border">
        <div className="flex items-center text-sm">
          <div>
            <p className="font-semibold text-black">{item}</p>
          </div>
        </div>
      </td>
      )
    })
  }


  const showHeaders = renderHeaders(headers)
  const showData1 = renderData(rowOne)
  const showData2 = renderData(rowTwo)

  if (isLoading) return <LoadingComp />
  return (
    // <section className="container mx-auto p-6 font-mono">
    <div className="w-full mx-10 overflow-hidden rounded-lg shadow-lg">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              {showHeaders}
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="text-gray-700">
              {showData1}
            </tr>
            <tr className="text-gray-700">
              {showData2}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    // </section>
  )
}
