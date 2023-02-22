import React from 'react'
import TopThreeCitiesBarGraph from './partials/TopThreeCitiesBarGraph'
import WeeklyEmailSubs from './partials/WeeklyEmailSubs'
import DailyVisitors from './partials/DailyVisitors'

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
    </div>
  )
}
