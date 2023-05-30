// import library
import React, { useRef } from 'react'

// comps
import InputXDiv from '../../../sharedPartials/InputXDiv'

export default function SearchTermInput({
    searchParams,
    setSearchParams,
    focusSearchTermInput,
    unfocusAll,
    isInputsFocused,
}) {
    const inputRef = useRef()

    return (
        <>
            {/* search Term Input */}
            <label
                className='flex w-full rounded p-0 my-2 relative h-[26px]'
            >
                <input
                    id='searchTermInput_Mobile'
                    ref={inputRef}
                    className='text-center w-full border rounded'
                    type='text'
                    placeholder='Search'
                    value={searchParams.searchTerm}
                    onChange={(e) => {
                        setSearchParams((draft) => { draft.searchTerm = e.target.value })
                        // console.log(`SearchVal set to ${e.target.value}`)
                    }}
                    onFocus={() => {
                        console.log("search Input focus entered")
                        focusSearchTermInput()
                    }}
                    // onFocusOut={()=>console.log("search Input focus exited")}
                    onBlur={() => {
                        console.log("search Input focus exited")
                        if (!isInputsFocused()) {
                            unfocusAll()
                        }
                    }}
                />
                {
                    isInputsFocused() &&
                    <InputXDiv
                        onClick={() => {
                            focusSearchTermInput()
                            setSearchParams((draft) => { draft.searchTerm = '' })
                        }}
                    />
                }
            </label>
        </>
    )
}
