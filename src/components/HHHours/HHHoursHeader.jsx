import React from 'react'

export default function HHHoursHeader() {
  return (
    <>
        <p
          className={`text-[11px] justify-items-start col-start-1 col-end-1 `}
        >Day</p>

        <p
          className={`text-[11px] justify-items-start flex mx-5 col-start-2 col-span-3`}
        >Happy Hour</p>

        <p
          className={`text-[11px] justify-items-start flex mx-5 col-start-5 col-span-3`}
        >Late Night</p>
    </>
  )
}
