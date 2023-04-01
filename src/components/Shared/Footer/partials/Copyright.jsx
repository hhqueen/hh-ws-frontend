import React from 'react'
import {TbCopyright} from "react-icons/tb"

export default function Copyright() {
  return (
    <div
        className='flex justify-center items-center text-white'
    >
        <TbCopyright/>
        <p
            className='pl-2'
        >2023 HHQueen</p>
    </div>
  )
}
