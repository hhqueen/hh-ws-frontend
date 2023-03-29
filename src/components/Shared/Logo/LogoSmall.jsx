import React from 'react'

export default function LogoSmall({ size = '57px', showText = true }) {   
    return (
        <div
            className='flex'
        >
            <img
                style={{
                    height: size,
                    width: size
                }}
                className='h-[57px] w-[57px] mr-[5px]'
                src='https://res.cloudinary.com/hhqueen/image/upload/v1675631956/website_assets/hhqueen_logo_CROWN_ujjvo5.svg'
                alt='hh queen'
            />
            {
                showText &&
                <div
                    className='flex items-center'
                >
                    <p
                        className='text-white font-bold'
                    >
                        HHQueen
                    </p>
                </div>
            }


        </div>
    )
}
