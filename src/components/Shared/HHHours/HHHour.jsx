import React from 'react'

export default function HHHour({dayOfWeek, happyHour, lateNight, colStyle}) {
  // console.log(dayOfWeek,happyHour,lateNight) 
  const timePTagClass = 'text-[11px] justify-items-start'
  return (
    <>
      <p
        className={colStyle.col1}
      >{dayOfWeek}</p>

      <div className={colStyle.col2}>

        <p
          className={timePTagClass}
        >{happyHour}</p>
      </div>

      <div className={colStyle.col3}>
        <p
          className={timePTagClass}
        >{lateNight}</p>
      </div>
    </>
  )
}
