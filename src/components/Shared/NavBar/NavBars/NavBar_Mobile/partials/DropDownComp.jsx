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
                className='absolute border w-full h-fit bg-white right-[0px] pt-0 mt-0 flex flex-col items-center'
            >
                {ComponentToRender}
            </ul>

        </>
    )
}
