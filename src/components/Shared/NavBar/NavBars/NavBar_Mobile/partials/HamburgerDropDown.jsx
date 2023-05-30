import React from 'react'
import MailIcon from './MailIcon_Mobile'
import SignUpComp from '../../../sharedPartials/SignUpComp'
import LogInComp from '../../../sharedPartials/LogInComp'
import LogOutComp from '../../../sharedPartials/LogOutComp'
import SurveyComp from '../../../sharedPartials/SurveyComp'
import Ig_IconComp from '../../../sharedPartials/Ig_IconComp'

export default function HamburgerDropDown({handleLogOut}) {
    return (
        <>
            <div
                className='flex flex-col gap-y-3'
            >
                <MailIcon/>
                <Ig_IconComp/>
                <SurveyComp/>
                <SignUpComp/>
                <LogInComp/>
                <LogOutComp
                    handleLogOut={handleLogOut}
                />
            </div>
        </>
    )
}
