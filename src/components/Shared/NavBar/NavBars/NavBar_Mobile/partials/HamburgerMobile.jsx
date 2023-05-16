import React, { useState } from 'react'
import { RxHamburgerMenu } from "react-icons/rx"


// import components
import HamburgerDropDown from './HamburgerDropDown'

export default function HamburgerMobile() {
    const [openState, setOpenState] = useState(false)



    return (
        <>
            <div
                className='relative cursor-pointer'
            >
                <div>
                    <div
                        onClick={() => setOpenState(prev => !prev)}
                    >
                        <RxHamburgerMenu
                            size={45}
                            color='white'
                        />
                    </div>
                    {openState &&
                        <>

                            {/* dropdown div */}
                            <HamburgerDropDown />
                        </>
                    }
                </div>
            </div >
        </>
    )
}
