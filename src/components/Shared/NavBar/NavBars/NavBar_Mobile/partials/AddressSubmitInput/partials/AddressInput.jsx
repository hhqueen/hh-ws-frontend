import React from 'react'

import InputXDiv from '../../../../../sharedPartials/InputXDiv'

export default function AddressInput({
    className,
    searchParams,
    setSearchParams,
    focusAddressInput,
    unfocusAll,
    isInputsFocused
}) {
    return (
        <>
            <label
                className='flex w-full rounded p-0 mb-2 relative h-[26px]'
            >
                <input
                    type="text"
                    className='text-center w-full border rounded'
                    value={searchParams.address}
                    onChange={(e) => {
                        setSearchParams((draft) => { draft.address = e.target.value })
                    }}
                    onFocus={() => {
                        // console.log("search Input focus entered")
                        focusAddressInput()
                    }}
                    // onFocusOut={()=>console.log("search Input focus exited")}
                    onBlur={() => {
                        // console.log("search Input focus exited")
                        if (!isInputsFocused()) unfocusAll()
                    }}
                />
                {
                    isInputsFocused() &&
                    <InputXDiv
                        onClick={() => {
                            focusAddressInput()
                            setSearchParams((draft) => { draft.address = '' })
                        }}
                    />
                }
            </label>
        </>
    )
}
