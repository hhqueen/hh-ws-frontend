import React ,{} from 'react'
import LogoLarge from '../../../Shared/Logo/LogoLarge'

export default function CarouselContainer() {
    const carousel_img_path = 'https://res.cloudinary.com/hhqueen/image/upload/q_auto,f_auto/website_assets/header_background_ib4e5t.png'

    const emailProps = {
        email: "hhqueen.official@gmail.com",
        subject: "Feedback",
        body:""
    }

    return (    
        <div
            // style={{backgroundImage: 'url(/images/carousel_lounge_img.jpg)'}}
            className="relative h-[40vh] md:h-[320px] w-[100vw]"
        >
            {/* <p>CarouselContainer</p> */}
            <img
                className='w-[100vw] h-full object-cover md:object-cover'
                src={`${carousel_img_path}`}
                alt='image'
            />
            <div
                className='mt-[2vh] flex flex-col md:flex-row justify-center items-center h-fit w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'
            >
                <div
                    className='flex flex-col text-white text-center text-[40.61px] font-bold justify-center px-5 md:w-[500px]'
                >
                    <p>Find your nearest</p>
                    <p>Happy Hours!</p>
                </div>

                {/* <LogoLarge /> */}

                {/* <div
                    className='flex flex-col justify-center items-center font-bold text-white'
                >
                    <p
                        className='mt-6 pt-3'
                    >Have any feedback or inquiries?</p>
                    <a
                        href={`mailto:${emailProps.email}?subject=${emailProps.subject}&body=${emailProps.body}`}
                    >
                        <button
                            className=' border w-[137px] h-[43px] rounded-[10px] mt-[5px] bg-white'
                        >
                            <p
                                className='text-[#372A88] leading-[18px] font-bold text-[15px]'
                            >Contact Us!</p>
                        </button>
                    </a>
                </div> */}
            </div>

        </div>
    )
}
