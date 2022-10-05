// import { useState } from 'react'
import Checkbox from './Checkbox'

// const dateConverter = require("../helperFunctions/dateConverter")

export default function FilterComp({dow,setDow, filterParams, setFilterParams, filterFormSubmitHandler }) {

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
                className='border w-[25vw]'
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
                    
                    <div>
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
                    </div>
                    
                    <ul>
                        {filtersMap}
                    </ul>
                </form>
            </div>

        </>
    )
}
