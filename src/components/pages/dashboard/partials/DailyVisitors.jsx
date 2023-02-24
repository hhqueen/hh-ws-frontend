import React, {useEffect} from 'react'
import { useImmer } from 'use-immer'

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

  useEffect(()=>{
    // fetch data
    // create empty prefilled rowOne array, size header.length
    // pre-fill out item 0 with "Average Last 7 Days"
    // create empty prefilled rowTwo array, size header.length
    // pre-fill out item 0 with "Average Last 30 Days"

    // filter data for last 7 days
    // calculate average for last 7 days for "Web", "Mobile", "Registered", "Unregistered"
    // filter data for last 30 days
    // calculate average for last 30 days for "Web", "Mobile", "Registered", "Unregistered"

    // set rowOne with 7 day avg data
    // set rowTwo with 30 day avg data
  },[])

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
          <div className="relative w-8 h-8 mr-3 rounded-full md:block">
            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
          </div>
          <div>
            <p className="font-semibold text-black">{item}</p>
          </div>
        </div>
      </td>
      )
    })
  }


  const showHeaders = renderHeaders(headers)
  const showData1 = renderData(data1)
  const showData2 = renderData(data2)

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
