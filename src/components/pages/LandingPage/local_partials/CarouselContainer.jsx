import React from 'react'
import LogoLarge from '../../../Logo/LogoLarge'

export default function CarouselContainer() {
  const carousel_img_path = '/images/carousel_lounge_img.jpg'
  
    return (
    <div
        // style={{backgroundImage: 'url(/images/carousel_lounge_img.jpg)'}}
        className={`relative h-[500px] w-auto`}
    >
        {/* <p>CarouselContainer</p> */}
        <img
            className='w-full h-full object-cover object-bottom'
            src={`${carousel_img_path}`}
            alt='image'
        />
        <div
            className='flex justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
        >
            <div
                className='flex flex-col text-white text-[48.61px] font-bold justify-center'
            >
                <p>Find your</p>
                <p>nearest</p>
                <p>Happy Hours</p>
            </div>

            <LogoLarge/>
            <div
                className='flex flex-col justify-center text-white'
            >
                <p>Have any feed back or inquries?</p>
                <button
                    className=' border w-[137px] h-[43px] rounded-[10px] opacity-75 mt-[5px]'
                >
                    <p
                        className='text-[#FFFAE7] leading-[18px] font-bold text-[15px]'
                    >Contact Us!</p>
                </button>
            </div>
        </div>
    
    </div>
  )
}
