import React from 'react'
import TopThreeCitiesBarGraph from './partials/TopThreeCitiesBarGraph'
import WeeklyEmailSubs from './partials/WeeklyEmailSubs'
import DailyVisitors from './partials/DailyVisitors'
import RegisteredProfiles from './partials/RegisteredProfiles'
import TopThreeRestPerCity from './partials/TopThreeRestPerCity'

export default function DashBoard({ mainDivStyle }) {
  return (
    <div
      style={mainDivStyle}
      className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2"
    >
      <section
        className='flex items-center justify-center'
      >
        <TopThreeRestPerCity />
      </section>
      <section
        className='flex items-center justify-center'
      >
        <DailyVisitors />
      </section>
      <section
        className='flex items-center justify-center'
      >
        <RegisteredProfiles />
      </section>
      <section
        className='flex items-center justify-center'
      >
        <WeeklyEmailSubs />
      </section>
    </div>
  )
}
