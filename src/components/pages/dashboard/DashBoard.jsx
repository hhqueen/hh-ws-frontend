import React from 'react'
import TopThreeCitiesBarGraph from './partials/TopThreeCitiesBarGraph'

export default function DashBoard({mainDivStyle}) {
  return (
    <div
      style={mainDivStyle}
    >
      <section
        className='flex items-center justify-center w-[50vw] h-[40vh]'
      >
        <TopThreeCitiesBarGraph/>
      </section>
    </div>
  )
}
