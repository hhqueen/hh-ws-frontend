import React from 'react'

export default function Unauthorized({mainDivStyle}) {
  return (
    <div
      className='flex items-center justify-center'
      style={mainDivStyle}
    >
      <div
        className='flex flex-col w-fit h-fit'
      >
        <p>Unauthorized</p>
      </div>
    </div>
  )
}
