import React, {useState} from 'react'


export default function WeeklyEmailSubs() {
  const [percentInc, setPercentInc] = useState(5)
  const [profileCount, setProfileCount] = useState(100)
  return (
    <section>
      <h1
        className='underline'
      >Weekly Email Subs - test</h1>
      <div>
        <p><span
          className='text-sky-600'
        >{percentInc}</span> % increase in last 7 days</p>
      </div>
      <div>
        <p>Current count of email subscribers = <span
        className='text-sky-600'
        >{profileCount}</span> unique emails</p>
      </div>  
    </section>
  )
}
