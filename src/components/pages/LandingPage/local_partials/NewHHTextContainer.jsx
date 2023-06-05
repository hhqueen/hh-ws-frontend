import React from 'react'

// Components
import NewHHText from './NewHHText'

// requires
const {emailBodyStringBuilder} = require("../../../../helperFunctions/emailBodyStringBuilder")


export default function NewHHTextContainer() {
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
  return (
    <>
        <NewHHText
            emailProps={emailProps}
        />
    </>
  )
}
