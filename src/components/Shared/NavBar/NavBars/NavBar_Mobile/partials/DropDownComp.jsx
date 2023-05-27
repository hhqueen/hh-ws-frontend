import React from 'react'

export default function DropDownComp({ 
    ComponentToRender = null,
    style
}) {

    if (ComponentToRender === null) return "Error, no component was passed in to DropDownComp!"
    return (
        <>
            <ul
                style={style}
                className='absolute border w-full h-fit bg-white right-[0px]flex flex-col items-center'
            >
                {ComponentToRender}
                {/* <div>123</div> */}
            </ul>

        </>
    )
}
