import React, { useState, useEffect } from 'react'
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

export default function DailyVisitors({ dailyVisitors }) {
  const [rowData, setRowData] = useImmer({
    1: [],
    2: [],
    3: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  const dailyVisitorsLastXDays = (dataArr, numDays) => {
    let rowArr = new Array(headers.length)
    const nowDate = new Date()
    const numDaysAgo = Date.parse(date.addDays(nowDate, -1 * numDays))

    let totalPageVisits = 0
    const uniqueWebVisitorsMap = new Map()
    const uniqueMobileVisitorsMap = new Map()

    const registeredProfilesMap = new Map()
    const unregisteredProfilesMap = new Map()

    const updateOrInsertIntoMap = (map, key) => {
      let value = 0
      map.set(key, map.has(key) ? value = map.get(key) + 1 : 0)
    }

    // console.log("dataArr", dataArr)
    dataArr.forEach((visitor) => {
      const parsedCreatedAt = Date.parse(visitor.createdAt)
      // console.log(vistor.endPointUrl)
      if (parsedCreatedAt >= numDaysAgo) {
        totalPageVisits++
        if (visitor.Mobile) {
          updateOrInsertIntoMap(uniqueMobileVisitorsMap, visitor.ipAddress)
        } else {
          updateOrInsertIntoMap(uniqueWebVisitorsMap, visitor.ipAddress)
        }
        if (visitor.UserId === null) {
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

  useEffect(() => {

    setRowData(draft => {
      draft[1] = dailyVisitorsLastXDays(dailyVisitors, 7)
      draft[2] = dailyVisitorsLastXDays(dailyVisitors, 30)
      draft[3] = dailyVisitorsLastXDays(dailyVisitors, 365)
    })
  }, [dailyVisitors])

  const renderHeaders = (array) => {
    return array.map((item) => {
      return <th className="p-3">{item}</th>
    })
  }

  const renderData = (array) => {
    return array.map((item) => {
      return (
        <td className="border text-center">
          {/* <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold text-black"> */}
          {item}
          {/* </p>
            </div>
          </div> */}
        </td>
      )
    })
  }


  const showHeaders = renderHeaders(headers)

  const mapRowData = Object.values(rowData).map((row) => {
    return (
      <>
        <tr className="text-gray-700">
          {renderData(row)}
        </tr>
      </>

    )
  })

  // if (isLoading) return <LoadingComp />
  return (
    <>
      <div
        className='flex justify-start'
      >
        <p>Visitor Analytics</p>
      </div>
      <table className="w-fit">
        <thead>
          <tr className="text-sm text-gray-900 bg-gray-100 border-b border-gray-600">
            {showHeaders}
          </tr>
        </thead>
        <tbody className="bg-white">
          {mapRowData}
        </tbody>
      </table>
    </>
  )
}
