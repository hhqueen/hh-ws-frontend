import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RxMagnifyingGlass } from 'react-icons/rx'
import appendSearchHistory from '../../../../helperFunctions/appendSearchHistory'

export default function SearchBar({ searchParams, setSearchParams, setAddressState, setSearchTermState }) {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // new code
        console.log("search term, address",searchParams.searchTerm, searchParams.address)
        setSearchTermState(searchParams.searchTerm)
        setAddressState(searchParams.address)
        appendSearchHistory(searchParams.searchTerm, searchParams.address)
        // keep this regardless
        navigate('/restaurants/')
    }

    return (
        <div
            className='w-[50vw] md:w-[20vw]'
        >
            <form
                className='flex flex-col justify-center items-center text-center'
                onSubmit={handleSubmit}
            >
                {/* search Term Input */}
                <input
                    className='text-center border w-full rounded-t p-0 m-0'
                    placeholder='Search'
                    value={searchParams.searchTerm}
                    onChange={(e) => {
                        setSearchParams((draft) => { draft.searchTerm = e.target.value })
                        // console.log(`SearchVal set to ${e.target.value}`)
                    }}
                />

                <div
                    className='flex w-full'
                >
                    {/* Location Input */}
                    <input
                        className='text-center border w-[40vw] md:w-[75%] rounded-bl p-0 m-0'
                        // type="text"
                        value={searchParams.address}
                        placeholder="Location"
                        list="searchLocationList"
                        onChange={(e) => {
                            setSearchParams((draft) => { draft.address = e.target.value })
                        }}
                        onClick={
                            (e) => { e.target.select() }
                        }
                    />
                    <datalist id="searchLocationList">
                        <option className="font-['Roboto']" value="Current Location">Current Location</option>
                    </datalist>
                    {/* Submit Button */}
                    <button
                        className='flex justify-center items-center border w-[10vw] md:w-[25%] rounded-br h-[26px] bg-gray-100'
                        type='submit'
                    >
                        <RxMagnifyingGlass />
                    </button>
                </div>
                {/* <div>

                </div> */}
            </form>
        </div>
    )
}
