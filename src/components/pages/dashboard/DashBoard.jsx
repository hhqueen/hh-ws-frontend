import React from 'react'
import TopThreeCitiesBarGraph from './partials/TopThreeCitiesBarGraph'
import WeeklyEmailSubs from './partials/WeeklyEmailSubs'
import DailyVisitors from './partials/DailyVisitors'
import RegisteredProfiles from './partials/RegisteredProfiles'

export default function DashBoard({ mainDivStyle }) {
  return (
    <div
      style={mainDivStyle}
      className="grid grid-cols-2 grid-rows-2"
    >
      <section
        className='flex items-center justify-center w-[50vw] h-[40vh]'
      >
        <TopThreeCitiesBarGraph />
      </section>
      <section
        className='flex items-center justify-center w-[50vw] h-[40vh]'
      >
        <DailyVisitors />
      </section>
      <section
        className='flex items-center justify-center w-[50vw] h-[40vh]'
      >
        <RegisteredProfiles />
      </section>
      <section
        className='flex items-center justify-center w-[50vw] h-[40vh]'
      >
        <WeeklyEmailSubs />
      </section>
    </div>
  )
}
