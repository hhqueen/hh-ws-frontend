// import { useState } from 'react'
import Checkbox from './Checkbox'

// const dateConverter = require("../helperFunctions/dateConverter")

export default function FilterComp({dow,setDow, filterParams, setFilterParams, filterFormSubmitHandler }) {
    
    // enhancement idea: untie filter date from restaurant cards

    const filtersMap = filterParams.map((filterVal, idx) => {
        return (
            <li
                key={`filter${idx}`}
            >
                <Checkbox
                    idx={idx}
                    filterParams={filterParams}
                    data={filterVal}
                    setFilterParams={setFilterParams}
                />
            </li>
        )
    })
    
    const dowList = ["Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday","Sunday"]
    const dowOptionsMap = dowList.map((day) => {
        if (dow===day) {
            return <option value={day} selected>{day}</option>
        } else {
            return <option value={day}>{day}</option>
        }        
    })

    return (
        <>
            <div
                className='border w-full sm:w-[25%] static'
            >
                <form
                    onSubmit={(e) => {
                        filterFormSubmitHandler(e)
                    }}
                >
                    <button
                        type='submit'
                        className="border"
                    >APPLY</button>
                    

                    
                    <ul
                    className='grid grid-cols-3 sm:grid-cols-1'
                    >
                        <li>
                            <label htmlFor='dow'>
                                <select
                                    id='dow'
                                    name='dow'
                                    size="1"
                                    onChange={(e)=>setDow(e.target.value)}
                                >
                                    {dowOptionsMap}
                                </select>
                            </label>
                        </li>
                        {filtersMap}
                    </ul>
                </form>
            </div>

        </>
    )
}
