import React from 'react'
import MailIconComp from '../../../sharedPartials/MailIconComp'
import SignUpComp from '../../../sharedPartials/SignUpComp'
import LogInComp from '../../../sharedPartials/LogInComp'
import LogOutComp from '../../../sharedPartials/LogOutComp'
import SurveyComp from '../../../sharedPartials/SurveyComp'
import Ig_IconComp from '../../../sharedPartials/Ig_IconComp'
import AddNewRestComp from '../../../sharedPartials/AddNewRestComp'
import ProfileLinkComp from '../../../sharedPartials/ProfileLinkComp'
import DashBoardLinkComp from '../../../sharedPartials/DashBoardLinkComp'

import jwt_decode from 'jwt-decode'

export default function HamburgerDropDown({ handleLogOut, unfocusAll }) {
    let authorized = false
    if (localStorage.getItem('jwt')) {
        authorized = jwt_decode(localStorage.getItem('jwt')).auth === "Admin"
    }
    return (
        <>
            <div
                className='flex flex-col gap-y-3 pl-3'
                onClick={unfocusAll}
            >
                <MailIconComp
                    unfocusAll={unfocusAll}

                />
                <Ig_IconComp
                    unfocusAll={unfocusAll}

                />
                <SurveyComp
                    unfocusAll={unfocusAll}

                />
                <SignUpComp
                    unfocusAll={unfocusAll}

                />
                <LogInComp
                    unfocusAll={unfocusAll}
                />
                {
                    authorized &&
                    <>
                        <AddNewRestComp />
                        <DashBoardLinkComp />
                        <ProfileLinkComp />
                    </>
                }
                <LogOutComp
                    handleLogOut={handleLogOut}
                    unfocusAll={unfocusAll}
                />
            </div>
        </>
    )
}
