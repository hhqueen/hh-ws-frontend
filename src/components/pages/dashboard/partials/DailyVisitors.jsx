import React from 'react'

const headers = [
  "Daily Vistors", "Web", "Mobile", "registered", "unregistered"
]

const data1 = [
  "Average Last 7 Days", 10, 10, 10, 10
]

const data2 = [
  "Average Last 30 Days", 10, 10, 10, 10
]

export default function DailyVisitors() {


  const renderData = (array) => {
      return array.map((item)=>{
        return <p>{item}</p>
      })
  } 

  const renderHeaders = renderData(headers)
  const renderData1 = renderData(data1)
  const renderData2 = renderData(data2)


  return (
    <div
      className='grid grid-cols-5 text-center border rounded-sm'
    >
      {renderHeaders}
      {renderData1}
      {renderData2}

    </div>
  )
}
