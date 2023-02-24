import React, { useState, useEffect } from 'react'
import axios from 'axios'
import date from 'date-and-time'
import LoadingComp from '../../../LoadingComp'

export default function RegisteredProfiles() {
  const [percentInc, setPercentInc] = useState(0)
  const [profileCount, setProfileCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const fetchedData = await axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics/registeredProfiles`)
        const fetchedDataData = fetchedData.data
        setProfileCount(fetchedDataData.length)
        const nowDate = new Date()
        const sevenDaysAgo = date.addDays(nowDate, -7)
        const sevenToFourteenDaysAgo = date.addDays(sevenDaysAgo, -7)
        // console.log("nowDate",nowDate)
        // console.log("sevenDaysAgo",sevenDaysAgo)
        // console.log("date compare",nowDate > sevenDaysAgo)
        let lastSevenDaysArr = []
        let sevenToFourteenDaysArr = []
        fetchedDataData.forEach((profile)=>{
          const parsedCreatedAt = date.parse(profile.createdAt, 'HH:mm:ss [GMT]Z')
          if(parsedCreatedAt >= sevenDaysAgo) {
            lastSevenDaysArr.push(profile)
          } else if (parsedCreatedAt < sevenDaysAgo && parsedCreatedAt >= sevenToFourteenDaysAgo ) {
            sevenToFourteenDaysArr.push(profile)
          }
        })
        let lastSevenDaysArrLength = lastSevenDaysArr.length > 0 ? lastSevenDaysArr.length : 0
        let sevenToFourteenDaysArrLength = sevenToFourteenDaysArr.length > 0 ? sevenToFourteenDaysArr.length : 0
        // let lastSevenDaysArrLength = 111
        // let sevenToFourteenDaysArrLength = 100
        let precentIncreaseVal = 0
        if (lastSevenDaysArrLength !== sevenToFourteenDaysArrLength) {
          precentIncreaseVal = (lastSevenDaysArrLength/sevenToFourteenDaysArrLength - 1) * 100
        }
        setPercentInc(Math.round(precentIncreaseVal))
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    } 
    fetchData()
  },[])
  const greenColor = "text-green-700 font-bold"
  const redColor = "text-rose-900 font-bold"
  let percentNumFontColor = percentInc > 0 ? greenColor : redColor

  if(isLoading) return <LoadingComp/>
  return (
    <section
      className='flex justify-center items-center'
    >
      <div>
        <h1
          className='underline'
        >Registered Profiles</h1>
        <div>
          <p><span
            className={percentNumFontColor}
          >{`${percentInc > 0 ? "+" : ""}${percentInc}%`}</span> from last 7 days</p>
        </div>
        <div>
          <p>Current count of registered profiles = <span
            className='text-sky-600 font-bold'
          >{profileCount}</span></p>
        </div>
      </div>
    </section>
  )
}
