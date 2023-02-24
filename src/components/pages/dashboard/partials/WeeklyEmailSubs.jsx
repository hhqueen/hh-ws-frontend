import React, { useState, useEffect } from 'react'
import axios from 'axios'
import date from 'date-and-time'


export default function WeeklyEmailSubs() {
  const [percentInc, setPercentInc] = useState(5)
  const [subCount, setSubCount] = useState(100)

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics/emailSubs`)
      const fetchedDataData = fetchedData.data
      setSubCount(fetchedDataData.length)
      const nowDate = new Date()
      const sevenDaysAgo = date.addDays(nowDate, -7)
      const sevenToFourteenDaysAgo = date.addDays(sevenDaysAgo, -7)

      let lastSevenDaysArr = []
      let sevenToFourteenDaysArr = []

      fetchedDataData.forEach((sub) => {
        const parsedCreatedAt = date.parse(sub.timestamp_opt, 'HH:mm:ss [GMT]Z')
        if (parsedCreatedAt >= sevenDaysAgo) {
          lastSevenDaysArr.push(sub)
        } else if (parsedCreatedAt < sevenDaysAgo && parsedCreatedAt >= sevenToFourteenDaysAgo) {
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

    }
    fetchData()
  }, [])

  const greenColor = "text-green-700 font-bold"
  const redColor = "text-rose-900 font-bold"
  let percentNumFontColor = percentInc > 0 ? greenColor : redColor

  return (
    <section
      className='flex justify-center items-center'
    >
      <div>
        <h1
          className='underline'
        >Weekly Email Subs</h1>
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
