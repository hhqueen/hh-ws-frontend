// import { useState } from 'react'
// import Checkbox from './Checkbox'
import { dowList } from "../sourceData/dowList"
import { Select, Button, Dropdown,Checkbox } from "flowbite-react"


// const dateConverter = require("../helperFunctions/dateConverter")

export default function FilterComp({ dow, setDow, filterParams, setFilterParams }) {

    // enhancement idea: untie filter date from restaurant cards

    const filtersMap = filterParams.map((filterVal) => {
        return (

            <Dropdown.Item
                onClick={()=>{
                    setFilterParams((draft)=>{
                        const foundItem = draft.find(item=>item.name == filterVal.name)
                        foundItem.value = !foundItem.value
                    })
                }}
            >
                <div
                className="flex"
                >
                <Checkbox
                    checked={filterVal.value}
                    readOnly
                />
                <p>{filterVal.display}</p>
                </div>
            </Dropdown.Item>
            // </li>
        )
    })

    // const dowList = ["Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday","Sunday"]
    const dowOptionsMap = dowList.map((day, idx) => {
        if (dow == day) {
            return <option key={`day-option${idx}`} value={day} selected>{day}</option>
        } else {
            return <option key={`day-option${idx}`} value={day}>{day}</option>
        }
    })

    return (
        <>
            <aside
                className='w-full sm:w-64 grow pb-2 sticky mt-[60px] bg-white dark:bg-gray-800'
                aria-label='Sidebar'
            >
                    <div
                        className='flex justify-center sm:overflow-y-auto sm:py-4 sm:px-3 '
                    >
                        <label
                            className='w-full'
                            htmlFor='dow'>
                            <Select
                                id='dow'
                                name='dow'
                                className=''
                                onChange={(e) => setDow(e.target.value)}
                            >
                                {dowOptionsMap}
                            </Select>
                        </label>
                        <div
                            className='w-full'
                        >
                            <Dropdown 
                                label="Filters"
                                dismissOnClick={false}
                            >
                            {filtersMap}
                            </Dropdown>
                        </div>
                    </div>
            </aside>
        </>
    )
}
