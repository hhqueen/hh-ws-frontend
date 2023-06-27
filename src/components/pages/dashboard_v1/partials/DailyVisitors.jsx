import React, {useState, useEffect} from 'react'
import { useImmer } from 'use-immer'
import axios from 'axios'
import date from 'date-and-time'
import LoadingComp from '../../../Shared/LoadingComp'

const headers = [
  "Daily Vistors", 
  "Total Page Visits", 
  "Total Unique Web Visitors", 
  "Total Unique Mobile Visitors", 
  "Registered Profiles",
  "Unregistered Profiles"
]

const data1 = [
  "Average Last 7 Days - test", 10, 10, 10, 10
]

const data2 = [
  "Average Last 30 Days - test", 10, 10, 10, 10
]

export default function DailyVisitors({dailyVisitors}) {
  const [rowOne, setRowOne] = useImmer([])
  const [rowTwo, setRowTwo] = useImmer([])
  const [rowThree, setRowThree] = useImmer([])
  const [isLoading, setIsLoading] = useState(false)

  const dailyVisitorsLastXDays = (dataArr, numDays) =>{
    let rowArr = new Array(headers.length)
    const nowDate = new Date()
    const numDaysAgo = Date.parse(date.addDays(nowDate, -1*numDays))

    let lastNumDaysArr = []
    let totalPageVisits = 0
    let totalUniqueWebVisitors = 0
    let totalUniqueMobileVisitors = 0
    let registeredProfiles = 0
    let unregisteredProfiles = 0

    const uniqueWebVisitorsMap = new Map()
    const uniqueMobileVisitorsMap = new Map()

    const registeredProfilesMap = new Map()
    const unregisteredProfilesMap = new Map()

    const updateOrInsertIntoMap = (map, key) =>{
      let value = 0
      map.set(key, map.has(key) ? value = map.get(key) + 1 : 0)
    }

    console.log("dataArr" , dataArr)
    dataArr.forEach((visitor)=>{
      const parsedCreatedAt = Date.parse(visitor.createdAt)
      // console.log(vistor.endPointUrl)
      if(parsedCreatedAt >= numDaysAgo ) {
        totalPageVisits++
        if(visitor.Mobile) {
          updateOrInsertIntoMap(uniqueMobileVisitorsMap, visitor.ipAddress)
        } else {
          updateOrInsertIntoMap(uniqueWebVisitorsMap, visitor.ipAddress)
        }
        if(visitor.UserId === null) {
          updateOrInsertIntoMap(unregisteredProfilesMap, visitor.ipAddress)
        } else {
          updateOrInsertIntoMap(registeredProfilesMap, visitor.UserId)
        }
      }
    })

    // const mobileScreenWidth = 500
    // calculate average for last Num days for "Web", "Mobile", "Registered", "Unregistered"
    rowArr[0] = `Last ${numDays} Days`
    rowArr[1] = totalPageVisits
    rowArr[2] = uniqueWebVisitorsMap.size
    rowArr[3] = uniqueMobileVisitorsMap.size
    rowArr[4] = registeredProfilesMap.size
    rowArr[5] = unregisteredProfilesMap.size
  
    return rowArr
  }

  useEffect(()=>{
      // set rowOne with 7 day data
      setRowOne(dailyVisitorsLastXDays(dailyVisitors, 7))
      // set rowTwo with 30 day data
      setRowTwo(dailyVisitorsLastXDays(dailyVisitors, 30))
      // set rowTwo with 365 day data
      setRowThree(dailyVisitorsLastXDays(dailyVisitors, 365))
  }, [dailyVisitors])

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
  const showData3 = renderData(rowThree)

  if (isLoading) return <LoadingComp />
  return (
    // <section className="container mx-auto p-6 font-mono">
    <div className="h-fit mx-10 overflow-hidden rounded-lg shadow-lg">
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
            <tr className="text-gray-700">
              {showData3}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    // </section>
  )
}
