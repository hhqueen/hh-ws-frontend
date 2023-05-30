import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx"


// import components

export default function HamburgerIcon({ 
    focusHamburger,
    unfocusAll,
    isInputsFocused
 }) {
    return (
        <>
            <div
                id="hamburgerIconContainerDiv_mobile"
                tabIndex="1"
                onFocus={()=>{
                    console.log("hamburgerIcon In Focus")
                    focusHamburger()
                }}
                onBlur={()=>{
                    if (!isInputsFocused()) unfocusAll()
                }}
                // onClick={setDropDownIsOpenState}
                className='relative cursor-pointer'
            >
                <RxHamburgerMenu
                    id='hamburgerIcon_mobile'
                    size={45}
                    color='white'
                />
            </div >
        </>
    )
}
