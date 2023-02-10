import React from 'react'
import LogoLarge from '../../../Logo/LogoLarge'

export default function CarouselContainer() {
    const carousel_img_path = 'https://res.cloudinary.com/hhqueen/image/upload/v1676041888/website_assets/header_background_ib4e5t.png'

    const emailProps = {
        email: "hhqueen.official@gmail.com",
        subject: "Feedback",
        body:""
    }

    return (    
        <div
            // style={{backgroundImage: 'url(/images/carousel_lounge_img.jpg)'}}
            className="relative h-[100vh] md:h-[320px] w-[100vw]"
        >
            {/* <p>CarouselContainer</p> */}
            <img
                className='w-full h-full object-fill md:object-cover object-bottom'
                src={`${carousel_img_path}`}
                alt='image'
            />
            <div
                className='flex flex-col md:flex-row justify-center items-center h-fit w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
            >
                <div
                    className='flex flex-col text-white text-center text-[48.61px] font-bold justify-center px-5 md:w-[300px]'
                >
                    <p>Find your nearest Happy Hours</p>
                </div>

                <LogoLarge />

                <div
                    className='flex flex-col justify-center items-center text-white'
                >
                    <p>Have any feedback or inquries?</p>
                    <a
                        href={`mailto:${emailProps.email}?subject=${emailProps.subject}&body=${emailProps.body}`}
                    >
                        <button
                            className=' border w-[137px] h-[43px] rounded-[10px] opacity-75 mt-[5px]'
                        >
                            <p
                                className='text-[#FFFAE7] leading-[18px] font-bold text-[15px]'
                            >Contact Us!</p>
                        </button>
                    </a>
                </div>
            </div>

        </div>
    )
}
