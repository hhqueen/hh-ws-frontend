import React from 'react'


export default function TopRestaurants({ restVisitCountArr, errorMsg, onRowClick }) {
  // console.log("restVisitCountArr(topRestaurants):", restVisitCountArr)     
  
  const headerStyle = 'border'
  const rowStyle = 'hover:bg-slate-200 hover:cursor-pointer border hover:text-[#372A88]'
  const cellStyle = 'text-center w-fit'

  const trMap = restVisitCountArr?.map((item, idx) => {
    return (
      <tr
        onClick={()=>{onRowClick(item?._id)}}
        className={rowStyle}
      >
        <td
          className={cellStyle}
        >{idx+1}</td>
        <td
          // className='text-center'
        >{item?.restaurantData[0]?.name}</td>
        <td
          className={cellStyle}
        >{item?.restaurantData[0]?.city}</td>
        <td
          className={cellStyle}
          >{item?.restaurantData[0]?.state}</td>
        <td
          className={cellStyle}
          >{item?.numOfVisits}</td>
      </tr>
    )
  })
  console.log("restVisitCountArr:", restVisitCountArr)
  if (errorMsg !== null) return errorMsg
  return (
    <>
      <table
        className='m-5'
      >
        <thead
          className={rowStyle}
        >
          <th
            className='w-[50px]'
          >No.</th>
          <th>Name</th>
          <th>City</th>
          <th>State</th>
          <th
            className='w-[100px]'
          >Visits</th>
        </thead>
        <tbody>
          {trMap}
        </tbody>
      </table>
    </>
  )
}
