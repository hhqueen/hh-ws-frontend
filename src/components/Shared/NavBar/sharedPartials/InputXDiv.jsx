import React from 'react'

// import FcCancel from 'react-icons/fc'

export default function InputXDiv({onClick}) {
    return (
        <>
            <div
                className='absolute flex items-center justify-end pr-2 text-center w-full h-full'
            >
                <div
                    onClick={onClick}
                    className='text-center rounded-full bg-white w-6 hover:bg-slate-300'
                >
                    X
                </div>
            </div>
        </>
    )
}
