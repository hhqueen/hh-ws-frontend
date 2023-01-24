import React from 'react'
import LogoSmall from './Logo/LogoSmall'
import Copyright from './Copyright'

export default function Footer() {
  return (
    <div
        className='flex justify-between bg-[#372A88] px-5'
    >
        <LogoSmall/>
        <Copyright/>
    </div>
  )
}
