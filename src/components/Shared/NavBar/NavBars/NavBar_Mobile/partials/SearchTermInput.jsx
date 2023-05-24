import React from 'react'

export default function SearchTermInput({
    searchParams,
    setSearchParams,
    focusSearchTermInput,
    unfocusAll
}) {
    return (
        <>
            {/* search Term Input */}
            <input
                className='text-center border w-full rounded p-0 my-2'
                type='text'
                placeholder='Search'
                value={searchParams.searchTerm}
                onChange={(e) => {
                    setSearchParams((draft) => { draft.searchTerm = e.target.value })
                    // console.log(`SearchVal set to ${e.target.value}`)
                }}
                onFocus={()=>{
                    console.log("search Input focus entered")
                    focusSearchTermInput()
                }}
                // onFocusOut={()=>console.log("search Input focus exited")}
                onBlur={()=>{
                    console.log("search Input focus exited")
                    unfocusAll()
                }}
            />
        </>
    )
}
