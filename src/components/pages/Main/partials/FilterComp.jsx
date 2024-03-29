import React, { useEffect, useState, useTransition, useContext } from 'react'

import { dowList } from "../../../../sourceData/dowList"
import { Dropdown, Checkbox } from "flowbite-react"
import apiLogger from "../../../../helperFunctions/apiLogger"
import { GlobalStateContext } from '../../../context/GlobalStateContext'

// daypicker
import DayPicker from './DayPicker'

export default function FilterComp({ UIFiltersProps, dow, setDow, filterParams, setFilterParams }) {
    const [anyChecked, setAnyChecked] = useState(false)
    const componentName = "FilterComp"
    const [isPendingTransition, startTransition] = useTransition()
    const DowContextVal = useContext(GlobalStateContext).dow
    // const DowContextVal = "Monday"

    const filtersMap = filterParams.map((filterVal) => {
        return (
            <Dropdown.Item>
                <label
                    htmlFor={`${filterVal.name}_checkbox`}
                >
                    <Checkbox
                        id={`${filterVal.name}_checkbox`}
                        name={`${filterVal.name}_checkbox`}
                        checked={filterVal.value}
                        // readOnly
                        onChange={(e) => {
                            apiLogger(e, componentName)
                            startTransition(()=>{
                                setFilterParams((draft) => {
                                    const foundItem = draft.find(item => item.name == filterVal.name)
                                    foundItem.value = !foundItem.value
                                })
                            })
                        }}
                    />
                    {filterVal.display}</label>
            </Dropdown.Item>
        )
    })

    // render logic for "uncheck all" / "check all"
    useEffect(()=>{
        let isAnyChecked = false
        filterParams.forEach((param)=>{
            if(param.value) { isAnyChecked = true }
        })
        if (UIFiltersProps.UIFilters.hasOnlyLateNightOnDay.value) { isAnyChecked = true }
        setAnyChecked(isAnyChecked)
    },[filterParams,UIFiltersProps])

    const dowList = ["Monday", "Tuesday", "Wednesday","Thursday","Friday","Saturday","Sunday"]
    const dowOptionsMap = dowList.map((day, idx) => {
        if (DowContextVal == day) {
            return <option key={`day-option${idx}`} value={day} selected>{day}</option>
        } else {
            return <option key={`day-option${idx}`} value={day}>{day}</option>
        }
    })

    // renders "uncheck all" or "check all"
    let renderCheckOrUnCheckAll = <></>
    if (anyChecked) {
        renderCheckOrUnCheckAll = (
            <>
                <p
                    id="UncheckAll_p"
                    name="UncheckAll_p"
                    className="text-xs text-sky-500 hover:text-sky-300"
                    onClick={(e) => {
                        // unchecks all filterParams
                        filterParams.forEach((filterVal) => {
                            setFilterParams((draft) => {
                                const foundItem = draft.find(item => item.name == filterVal.name)
                                foundItem.value = false
                            })
                        })

                        //unchecks hasOnlyLateNightOnDay 
                        UIFiltersProps.setUIFilters((draft) => {
                            draft.hasOnlyLateNightOnDay.value = false
                        })
                        // logs to db
                        apiLogger(e, componentName)
                    }}
                >
                    Uncheck All
                </p>
            </>
        )
    } else {
        renderCheckOrUnCheckAll = (
            <>
                <p
                    id="CheckAll_p"
                    name="CheckAll_p"
                    className="text-xs text-sky-500 hover:text-sky-300"
                    onClick={(e) => {
                        // unchecks all filterParams
                        filterParams.forEach((filterVal) => {
                            setFilterParams((draft) => {
                                const foundItem = draft.find(item => item.name == filterVal.name)
                                foundItem.value = true
                            })
                        })

                        //unchecks hasOnlyLateNightOnDay 
                        UIFiltersProps.setUIFilters((draft) => {
                            draft.hasOnlyLateNightOnDay.value = true
                        })
                        // logs to db
                        apiLogger(e, componentName)
                    }}
                >
                    Check All
                </p>
            </>
        )
    }

    return (
        <>
            {/* new day picker code */}
            <div
                className='flex justify-center'
            >   
                <DayPicker
                    dow={dow}
                    setDow={setDow}
                />
            </div>
            <aside
                className='w-full sm:w-[20rem] pb-2 sticky bg-white dark:bg-gray-800 z-40'
                aria-label='Sidebar'
            >
                <div
                    className='flex justify-center sm:overflow-y-auto sm:py-4 sm:px-3 '
                >
                    {/* <label
                        className='w-fit'
                        htmlFor='dow'>
                        <Select
                            id='dow'
                            name='dow'
                            onChange={(e) => {
                                apiLogger(e, componentName)
                                startTransition(()=>{
                                    setDow(e.target.value)  
                                })
                            }
                            }
                        >
                            {dowOptionsMap}
                        </Select>
                    </label> */}
                    <div
                        className='w-fit sm:w-fit'
                    >
                        <Dropdown
                            label="Filters"
                            className=""
                        >
                            <Dropdown.Item
                            >
                                {renderCheckOrUnCheckAll}
                            </Dropdown.Item>

                            {filtersMap}

                            {/* UIFilter  */}
                            <Dropdown.Item>
                                <label
                                    htmlFor={UIFiltersProps.UIFilters.hasOnlyLateNightOnDay.name}
                                >
                                    <Checkbox
                                        id={UIFiltersProps.UIFilters.hasOnlyLateNightOnDay.name}
                                        name={UIFiltersProps.UIFilters.hasOnlyLateNightOnDay.name}
                                        checked={UIFiltersProps.UIFilters.hasOnlyLateNightOnDay.value}
                                        onChange={(e) => {
                                            apiLogger(e, componentName)
                                            UIFiltersProps.setUIFilters((draft) => {
                                                draft.hasOnlyLateNightOnDay.value = !draft.hasOnlyLateNightOnDay.value
                                            })
                                        }}
                                    />
                                    {UIFiltersProps.UIFilters.hasOnlyLateNightOnDay.displayName}</label>
                            </Dropdown.Item>
                        </Dropdown>
                    </div>

                </div>
                {/* <div>
                    <label
                        htmlFor={UIFiltersProps.UIFilters.hasOnlyLateNightOnDay.name}
                    >
                        <Checkbox
                            id={UIFiltersProps.UIFilters.hasOnlyLateNightOnDay.name}
                            name={UIFiltersProps.UIFilters.hasOnlyLateNightOnDay.name}
                            checked={UIFiltersProps.UIFilters.hasOnlyLateNightOnDay.value}
                            onClick={(e) => {
                                UIFiltersProps.setUIFilters((draft) => {
                                    draft.hasOnlyLateNightOnDay.value = !draft.hasOnlyLateNightOnDay.value
                                })
                            }}
                        />
                        {UIFiltersProps.UIFilters.hasOnlyLateNightOnDay.displayName}</label>
                </div> */}
            </aside>
        </>
    )
}
