import React, {useEffect, useRef, useState} from 'react'
import LogoSmall from '../Logo/LogoSmall'
import Copyright from './partials/Copyright'

export default function Footer({
  setFooterHeight, 
  contentHeight,
  setScreenSize
}) {
  const footerDiv = useRef(null)
  const [footerMarginTop, setFooterMarginTop] = useState(0)
  
  useEffect(()=>{
    setFooterHeight(footerDiv.current.clientHeight)
    setFooterMarginTop(contentHeight + footerDiv.current.clientHeight)

    setScreenSize((draft)=>{
      draft.component.footerHeight = footerDiv.current.clientHeight
    })

  },[contentHeight,footerDiv])

  return (
    <footer
        // style={footerDivStyle}
        className='flex justify-between bg-[#372A88] px-5'
        ref={footerDiv}
    >
        <LogoSmall/>
        <Copyright/>
    </footer>
  )
}
