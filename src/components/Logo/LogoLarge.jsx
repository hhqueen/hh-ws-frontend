import React from 'react'

export default function LogoLarge() {
    return (
        <div
            className='flex flex-col md:mr-[60px]'
        >
            <img
                className='h-[300px] w-[300px] mb-[5px] object-cover'
                src='https://res.cloudinary.com/hhqueen/image/upload/v1675632375/website_assets/hhq-icon_tgc27d.png'
                alt='hh queen'
            />
            <div
                className='flex items-center justify-center'
            >
                <p
                    className='text-white font-bold text-[41px]'
                >
                    HHQueen
                </p>
            </div>

        </div>
    )
}
