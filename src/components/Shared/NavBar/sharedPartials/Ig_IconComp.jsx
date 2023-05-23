import React from 'react'
import apiLogger from '../../../../helperFunctions/apiLogger'
import IG_Logo from '../../Logo/IG_Logo'

export default function Ig_IconComp() {
    const componentName = "Ig_IconComp"
    return (
        <>
            <a
                name="IG_Link"
                id='IG_Link'
                onClick={(e) => {
                    // apilogger(e, componentName, 'IG_Link')
                }}
                href='https://www.instagram.com/hhqueen.official/' target="_blank" rel="noreferrer">
                <div
                    className='flex items-center'

                >
                    <IG_Logo
                        height={45}
                    />
                    <p
                        className='pl-3 break-normal w-[70%]'
                    >Follow us on Instagram</p>
                </div>
            </a>
        </>
    )
}
