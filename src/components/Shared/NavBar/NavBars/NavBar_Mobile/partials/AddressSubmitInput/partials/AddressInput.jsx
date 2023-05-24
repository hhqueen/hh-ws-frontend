import React from 'react'

export default function AddressInput({
    className,
    searchParams,
    setSearchParams,
    focusAddressInput,
    unfocusAll
}) {
  return (
    <>
        <input 
            type="text" 
            className={className}
            value={searchParams.address}
            onChange={(e) => {
                setSearchParams((draft) => { draft.address = e.target.value })
            }}
            onFocus={()=>{
                console.log("search Input focus entered")
                focusAddressInput()
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
