import React from 'react'
import AddressInput from './partials/AddressInput'


export default function AddressSubmitInputContainer({
    searchParams,
    setSearchParams,
    focusAddressInput,
    unfocusAll,
    isInputsFocused
}) {

    return (
        <>
{/* 
            <div
                className='flex w-full h-fit'
            > */}
                <AddressInput
                    className="text-center border w-full rounded p-0 mb-2"
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    focusAddressInput={focusAddressInput}
                    unfocusAll={unfocusAll}
                />
            {/* </div> */}
        </>
    )
}
