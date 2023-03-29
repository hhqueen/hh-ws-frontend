import React from 'react'

export default function HHHoursHeader({colStyle}) {
  return (
    <>
        <p
          className={colStyle.col1}
        >Day</p>

        <p
          className={colStyle.col2}
        >Happy Hour</p>

        <p
          className={colStyle.col3}
        >Late Night</p>
    </>
  )
}
