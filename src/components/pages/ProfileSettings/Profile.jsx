import React from 'react'

export default function Profile({ handleProfileSubmit, profileData, handleProfileDataOnChange, passwordState, handlePasswordStateOnChange }) {
  const passwordEntries = Object.entries(passwordState)
  const passwordInputsMap = passwordEntries.map((ele) => {
    return (
      <>
        <label
          htmlFor={ele[0]}
          className='grid grid-cols-2 grid-rows-1'
        >
          <p>{ele[1].displayName}</p>
          <input
            id={ele[0]}
            name={ele[0]}
            // type="password"
            className='border rounded'
            value={ele[1].value}
            onChange={handlePasswordStateOnChange}
          />
        </label>
      </>
    )
  })

  return (
    <form
      className='flex flex-col items-center w-full'
      onSubmit={handleProfileSubmit}
    >
      <label
        htmlFor='firstName'
        className='grid grid-cols-2 grid-rows-1'
      >
        <p>First Name</p>
        <input
          id='firstName'
          name="firstName"
          className='border rounded'
          value={profileData.firstName}
          onChange={handleProfileDataOnChange}
        />
      </label>

      <label
        htmlFor='lastName'
        className='grid grid-cols-2 grid-rows-1'
      >
        <p>Last Name</p>
        <input
          id='lastName'
          name="lastName"
          className='border rounded'
          value={profileData.lastName}
          onChange={handleProfileDataOnChange}
        />
      </label>

      <label
        htmlFor='email'
        className='grid grid-cols-2 grid-rows-1'
      >
        <p>Email</p>
        <input
          id='email'
          name="email"
          className='border rounded'
          value={profileData.email}
          onChange={handleProfileDataOnChange}
        />
      </label>

      {/* <label
        htmlFor='email'
        className='grid grid-cols-2 grid-rows-1'
      >
        <p>Email</p>
        <input
          id='email'
          name="email"
          className='border rounded'
          value={profileData.email}
        />
      </label> */}
      <label
        htmlFor='emailSub'
        className='grid grid-cols-2 grid-rows-1'
      >
        <p>Email Sub</p>
        <input
          id='emailSub'
          name="emailSub"
          type='checkbox'
          checked={profileData.emailSubbed}
          className='border rounded'
          onChange={handleProfileDataOnChange}
        />
      </label>

      {passwordInputsMap}

      <button
        type='submit'
      >
        Submit
      </button>
    </form >
  )
}
