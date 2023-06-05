import React from 'react'

export default function NewHHText({emailProps}) {
  return (
    <div
    className='py-10 text-center text-sky-600 hover:underline hover:text-sky-800'
>
    <a
        href={`mailto:${emailProps.email}?subject=${emailProps.subject}&body=${emailProps.body}`}
    >
        Are you a restaurant or bar with a happy hour to share? Submit your happy hour here.
    </a>
</div>
  )
}
