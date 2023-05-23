import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx"


// import components

export default function HamburgerMobile({ setDropDownIsOpenState }) {
    return (
        <>
            <div
                onClick={setDropDownIsOpenState}
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
