import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import date from 'date-and-time'
import LoadingComp from '../../../Shared/LoadingComp'

export default function WeeklyEmailSubs() {
  const [percentInc, setPercentInc] = useState(0)
  const [subCount, setSubCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
      const fetchedData = await axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics/emailSubs`)
      const fetchedDataData = fetchedData.data
      setSubCount(fetchedDataData.length)
      const nowDate = new Date()
      const sevenDaysAgo = date.addDays(nowDate, -7)
      const sevenDaysAgoDateParsed = Date.parse(date.addDays(nowDate, -7))
      const sevenToFourteenDaysAgo = Date.parse(date.addDays(sevenDaysAgo, -7))

      let lastSevenDaysArr = []
      let sevenToFourteenDaysArr = []

      fetchedDataData.forEach((sub) => {
        console.log("sub.timestamp_opt",sub.timestamp_opt)
        const parsedCreatedAt = Date.parse(sub.timestamp_opt)
        if (parsedCreatedAt >= sevenDaysAgoDateParsed) {
          lastSevenDaysArr.push(sub)
        } else if (parsedCreatedAt < sevenDaysAgoDateParsed && parsedCreatedAt >= sevenToFourteenDaysAgo) {
          sevenToFourteenDaysArr.push(sub)
        }
      })
      let lastSevenDaysArrLength = lastSevenDaysArr.length > 0 ? lastSevenDaysArr.length : 0
      let sevenToFourteenDaysArrLength = sevenToFourteenDaysArr.length > 0 ? sevenToFourteenDaysArr.length : 0
      // let lastSevenDaysArrLength = 111
      // let sevenToFourteenDaysArrLength = 100
      let precentIncreaseVal = 0
      if (lastSevenDaysArrLength !== sevenToFourteenDaysArrLength) {
        precentIncreaseVal = (lastSevenDaysArrLength / sevenToFourteenDaysArrLength - 1) * 100
      }
      setPercentInc(Math.round(precentIncreaseVal))
      setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const greenColor = "text-green-700 font-bold"
  const redColor = "text-rose-900 font-bold"
  let percentNumFontColor = percentInc > 0 ? greenColor : redColor
  if(isLoading) return <LoadingComp/>
  return (
    <section
      className='flex justify-center items-center'
    >
      <div>
        {/* <a href='https://us21.admin.mailchimp.com/lists/members?id=1571#p:1-s:25-sa:last_update_time-so:false'> */}
        <h1
          className='underline'
        >Weekly Email Subs</h1>
        {/* </a> */}
        <div>
          <p><span
            className={percentNumFontColor}
          >{`${percentInc > 0 ? "+" : ""}${percentInc}%`}</span> from last 7 days</p>
        </div>
        <div>
          <p>Current count of email subscribers = <span
            className='text-sky-600 font-bold'
          >{subCount}</span> unique emails</p>
        </div>
      </div>
    </section>
  )
}
