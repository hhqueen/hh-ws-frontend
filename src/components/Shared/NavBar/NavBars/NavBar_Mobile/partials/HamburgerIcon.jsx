import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx"


// import components

export default function HamburgerIcon({ 
    setDropDownIsOpenState,
    focusHamburger,
    unfocusAll
 }) {
    return (
        <>
            <div
                onFocus={focusHamburger}
                onBlur={unfocusAll}
                // onClick={setDropDownIsOpenState}
                className='relative cursor-pointer'
            >
                <RxHamburgerMenu
                    size={45}
                    color='white'
                />
            </div >
        </>
    )
}
