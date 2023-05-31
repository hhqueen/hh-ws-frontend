import React, { useContext, useEffect, useState } from 'react'
// import apilogger from '../../../../../helperFunctions/apiLogger'
import { FiMail } from 'react-icons/fi'

// global context
import {GlobalStateContext} from '../../../context/GlobalStateContext'

const { emailBodyStringBuilder } = require("../../../../helperFunctions/emailBodyStringBuilder")


export default function MailIconComp() {

    const globalStateContextVal = useContext(GlobalStateContext)
    // console.log("GlobalStateContextVal_MailIconComp",globalStateContextVal)
    const componentName = "NavBar_MailIcon"
    const userDeviceData = {
        uad: window.navigator.userAgent,
        mobile: window.navigator.userAgentData?.mobile,
        browser: window.navigator.userAgentData?.brands[1]?.brand,
        OS: window.navigator.userAgentData?.platform,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight
    }
    //   console.log("userDeviceData:", userDeviceData)
    let bodyLines = []
    Object.entries(userDeviceData).forEach((entry) => {
        bodyLines.push(`${entry[0]}: ${entry[1]}`)
    })

    const emailProps = {
        email: "hhqueen.official@gmail.com",
        subject: "FeedBack on HHQ",
        body: emailBodyStringBuilder(bodyLines)
    }
    
    return (
        <>
            <a
                name="mail_icon"
                id='mail_icon'
                onClick={(e) => {
                    // apilogger(e, componentName, 'mail_icon')
                }}
                href={`mailto:${emailProps.email}?subject=${emailProps.subject}&body=${emailProps.body}`}>
                <div
                    className='flex items-center'

                >
                    <FiMail
                        color={globalStateContextVal.isMobile ? 'black' : 'white'}
                        size={40}
                        opacity={.6}
                    />
                    {/* <p>{globalStateContextVal.isMobile}</p> */}
                    {
                        globalStateContextVal.isMobile &&
                        <>
                            <p
                                className='pl-3'
                            >Mail Us</p>
                        </>
                    }

                </div>
            </a>
        </>
    )
}
