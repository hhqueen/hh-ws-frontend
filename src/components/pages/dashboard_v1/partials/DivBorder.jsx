import React from 'react'

export default function DivBorder({ divName }) {
    return (
        <div
            className='w-full h-full flex justify-items-center'
        >
            <div>
                <p>DivName: {divName}</p>
                <p>Width: {window.innerWidth}</p>
                <p>Height: {window.innerHeight}</p>
            </div>
        </div>
    )
}
