import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RxMagnifyingGlass } from 'react-icons/rx'


export default function SearchBar({ searchParams, setSearchParams, setAddressState, setSearchTermState }) {
    const navigate = useNavigate()

    return (
        <div
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault()

                    // new code
                    setSearchTermState(searchParams.searchTerm)
                    setAddressState(searchParams.address)

                    // keep this regardless
                    // navigate('/restaurants/')
                }}
            >
                {/* search Term Input */}
                {/* <input
                    className='border w-[50vw] rounded-t p-0 m-0'
                    value={searchParams.searchTerm}
                    onChange={(e) => {
                        setSearchParams((draft) => { draft.searchTerm = e.target.value })
                        // console.log(`SearchVal set to ${e.target.value}`)
                    }}
                /> */}

                <div
                    className='bg-transparent'
                >
                    {/* Location Input */}
                    <input
                        className='border w-[30vw] rounded-bl p-0 m-0'
                        value={searchParams.address}
                        list="searchLocationList"
                        onChange={(e) => {
                            setSearchParams((draft) => { draft.address = e.target.value })
                            // console.log(`Address set to ${e.target.value}`)
                        }}
                    />

                    <datalist id="searchLocationList">
                        <option className="font-['Roboto']" value="Current Location">Current Location</option>
                    </datalist>

                    {/* Submit Button */}
                    <button
                        className='border w-[5vw] rounded-br h-[26px] bg-gray-100'
                        type='submit'
                    ><RxMagnifyingGlass /></button>
                </div>
            </form>
        </div>
    )
}
