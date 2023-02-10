import React from 'react'

export default function LogoLarge() {
    return (
        <div
            className='flex flex-col md:mr-[60px]'
        >
            <img
                className='h-[200px] w-[200px] md:h-[280px] md:w-[280px] object-cover'
                src='https://res.cloudinary.com/hhqueen/image/upload/v1675632375/website_assets/hhq-icon_tgc27d.png'
                alt='hh queen'
            />
            <div
            className='flex justify-center'
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
