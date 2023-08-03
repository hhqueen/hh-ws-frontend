import React from 'react'
const { emailBodyStringBuilder } = require("../../helperFunctions/emailBodyStringBuilder")
export default function Faq({ mainDivStyle }) {

    const questionEmail = {
        email: "hhqueen.official@gmail.com",
        subject: "",
        // body: emailBodyStringBuilder(bodyLines) // implented per Feature# 75
    }

    const bodyLines = [// implented per Feature# 75
        'Location Name:',
        'Location Address:',
        'Days and Hours of happy hour:',
        'Are you dog friendly?',
        'Do you have a patio or rooftop?',
        'Attach high resolution picture of HH menu.'
    ]

    const emailProps = {
        email: "hhqueen.official@gmail.com",
        subject: "new HHQ submission request",
        body: emailBodyStringBuilder(bodyLines) // implented per Feature# 75
    }

    const hyperlinkStyle = 'text-blue-600 hover:text-blue-800 hover:underline'

    return (
        <div
            style={mainDivStyle}
            className='flex mx-10'
        >
            <p>
                <span
                    className='font-bold'
                >
                Frequently Asked Questions (FAQs).
                </span>
                <br></br>
                <br></br>
                <span
                    className='font-bold'
                >Do you have an app?</span> Not yet! Sign up at&nbsp;
                <a
                    className={hyperlinkStyle}
                    href='/signup'>
                    hhqueen.com/signup
                </a>
                &nbsp;and get notified when it is available!
                <br></br>
                <span
                    className='font-bold'
                >Can I submit an HH?</span>  Yes! Please click&nbsp;

                <a
                    className={hyperlinkStyle}
                    href={`mailto:${emailProps.email}?subject=${emailProps.subject}&body=${emailProps.body}`}
                >
                    here
                </a>

                , provide the details requested and we will add it to our database. Thank you for helping grow HHQueen!
                <br></br>
                <span
                    className='font-bold'
                >How often do you update HHs?</span>  Currently, I am manually updating menus. However, we are working on automating this process to allow businesses to ensure the accuracy of their listing at all times. You can currently see the “Last Updated” date on the bottom of each page.
                <br></br>
                <span
                    className='font-bold'
                >Ok this isn’t a question but I will have more questions later!</span>  No worries, email us whenever the question pops up: &nbsp;
                <a
                    className={hyperlinkStyle}
                    href={`mailto:${questionEmail.email}?subject=""&body=""`}>
                    <span
                        className='text-blue-400 hover:text-blue-600 hover:underline'
                    >
                        hhqueen.official@gmail.com
                    </span>
                </a>
            </p>
        </div>
    )
}
