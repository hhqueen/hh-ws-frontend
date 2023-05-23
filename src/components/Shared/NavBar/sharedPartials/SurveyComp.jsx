import React from 'react'
import apiLogger from '../../../../helperFunctions/apiLogger'

export default function SurveyComp() {
    const componentName = "SurveyComp"
    return (
        <>
            <a
                name="survey_p"
                id='survey_p'
                onClick={(e) => {
                    // apilogger(e, componentName, 'survey_p')
                }}
                href='https://docs.google.com/forms/d/e/1FAIpQLSfVTC5A4W9LeuPXbR70ROILcFwTKneThVzZTh9ATTw0DHWgrQ/viewform' target="_blank" rel="noreferrer">
                <div
                    className=''

                >
                    <p
                        className=''
                    >Survey</p>
                </div>
            </a>
        </>
    )
}
