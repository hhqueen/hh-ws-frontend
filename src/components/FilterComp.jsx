// import { useState } from 'react'
import Checkbox from './Checkbox'
import { dowList } from "../sourceData/dowList"
import {Select} from "flowbite-react"

// const dateConverter = require("../helperFunctions/dateConverter")

export default function FilterComp({ dow, setDow, filterParams, setFilterParams, filterFormSubmitHandler }) {

    // enhancement idea: untie filter date from restaurant cards

    const filtersMap = filterParams.map((filterVal, idx) => {
        return (
            <li
                key={`filter${idx}`}
            >
                <Checkbox
                    key={`filterCheckbox${idx}`}
                    idx={idx}
                    filterParams={filterParams}
                    data={filterVal}
                    setFilterParams={setFilterParams}
                />
            </li>
        )
    })

    // const dowList = ["Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday","Sunday"]
    const dowOptionsMap = dowList.map((day,idx) => {
        if (dow === day) {
            return <option key={`day-option${idx}`} value={day} defaultValue>{day}</option>
        } else {
            return <option key={`day-option${idx}`} value={day}>{day}</option>
        }
    })

    return (
        <>
            <aside
            className='w-full sm:w-64 sticky top-[48px] border bg-gray-50 rounded dark:bg-gray-800'
            aria-label='Sidebar'
            >
                
                    <form
                        className='sm:overflow-y-auto sm:py-4 sm:px-3 '
                        onSubmit={(e) => {
                            filterFormSubmitHandler(e)
                        }}
                    >
                        <button
                            type='submit'
                            className="border"
                        >APPLY</button>



                        <ul
                            className='grid grid-cols-3 sm:flex sm:flex-col sm:space-y-2'
                        >
                            <li>
                                <label htmlFor='dow'>
                                    <Select
                                        id='dow'
                                        name='dow'
                                        size=""
                                        className=''
                                        onChange={(e) => setDow(e.target.value)}
                                    >
                                        {dowOptionsMap}
                                    </Select>
                                </label>
                            </li>
                            {filtersMap}
                        </ul>
                    </form>
            </aside>
        </>
    )
}
