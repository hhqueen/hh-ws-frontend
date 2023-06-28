import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import date from 'date-and-time'

export default function MembershipAnalytics({registeredProfiles,emailSubs}) {
    const [headerData, setHeaderData] = useImmer(["", "Registered HHQ Profiles", "Email Subscribers"])
    const [rowData, setRowData] = useImmer({
        1:["", 0, 0],
        2:["", 0, 0],
        3:["", 0, 0],
    })

    // const 
    console.log("emailSubs", emailSubs)
    const filterEmailStatus = (arr, statusVal) =>{
      return arr.filter((item)=> item.status == statusVal)
    }

    const getDataLastXDays = (arr, numDays, key) => {
        let newArr = []
        arr.forEach((item) => {
            if(Date.parse(item[key]) >= Date.parse(date.addDays(new Date(), -1 * numDays))){
                newArr.push(item)
            }
          })
        return newArr 
    }

    const constructRowArrs = (numDays) =>{
        return [
            `Last ${numDays} Days`,
            getDataLastXDays(registeredProfiles, numDays, "createdAt").length,
            filterEmailStatus(getDataLastXDays(emailSubs, numDays, "timestamp_opt"), "subscribed").length
        ]  
    }

    useEffect(()=>{
        setRowData(draft=>{
            draft[1] = constructRowArrs(7)
            draft[2] = constructRowArrs(30)
            draft[3] = constructRowArrs(365)
        })
    },[registeredProfiles, emailSubs])

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

      const showHeaders = renderHeaders(headerData)

      const mapRowData = Object.values(rowData).map((row) => {
        return (
          <>
            <tr className="text-gray-700">
              {renderData(row)}
            </tr>
          </>
    
        )
      })
  
    return (
        <>
      <div
        className='flex justify-start'
      >
        <p>MemberShip Analytics</p>
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
