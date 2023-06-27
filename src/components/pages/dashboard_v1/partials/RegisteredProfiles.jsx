import React, { useState, useEffect } from 'react'
import axios from 'axios'
import date from 'date-and-time'
import LoadingComp from '../../../Shared/LoadingComp'
import { useImmer } from 'use-immer'

export default function RegisteredProfiles({ registeredProfiles }) {
  const [percentInc, setPercentInc] = useState(0)
  const [profileCount, setProfileCount] = useState(0)
  const [memberStats, setMemberStats] = useImmer([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        console.log("registeredProfiles", registeredProfiles)
        const fetchedDataData = registeredProfiles
        setProfileCount(fetchedDataData.length)
        const nowDate = new Date()

        
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [registeredProfiles])
  const greenColor = "text-green-700 font-bold"
  const redColor = "text-rose-900 font-bold"
  let percentNumFontColor = percentInc > 0 ? greenColor : redColor

  if (isLoading) return <LoadingComp />
  return (
    <section
      className='flex justify-center items-center w-[200px] p-4'
    >
      <div>
        <h1
          className='underline'
        >Registered Profiles</h1>
        {/* <a href='https://us21.admin.mailchimp.com/lists/members?id=1571#p:1-s:25-sa:last_update_time-so:false' target="_blank">

        </a>
        
        <div>
          <p><span
            className={percentNumFontColor}
          >{`${percentInc > 0 ? "+" : ""}${percentInc}%`}</span> from last 7 days</p>
        </div> */}

        <div
          className=''
        >
          <p>Total User Accounts: <span
            className='text-sky-600 font-bold'
          >{profileCount}</span></p>
        </div>

      </div>

    </section>
  )
}
