import { dowList } from "../sourceData/dowList"
import { Select, Dropdown, Checkbox } from "flowbite-react"
import apiLogger from "../helperFunctions/apiLogger"

export default function FilterComp({ UIFiltersProps, dow, setDow, filterParams, setFilterParams }) {
    const componentName = "FilterComp"
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
                        onClick={(e) => {
                            apiLogger(e, componentName)
                            setFilterParams((draft) => {
                                const foundItem = draft.find(item => item.name == filterVal.name)
                                foundItem.value = !foundItem.value
                            })
                        }}
                    />
                    {filterVal.display}</label>
            </Dropdown.Item>
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
                className='w-full sm:w-[20rem] grow pb-2 sticky mt-[180px] bg-white dark:bg-gray-800 z-40'
                aria-label='Sidebar'
            >
                <div
                    className='flex justify-center sm:overflow-y-auto sm:py-4 sm:px-3 '
                >
                    <label
                        className='w-fit'
                        htmlFor='dow'>
                        <Select
                            id='dow'
                            name='dow'
                            onChange={(e) => {
                                apiLogger(e, componentName)
                                setDow(e.target.value)}
                            }
                        >
                            {dowOptionsMap}
                        </Select>
                    </label>
                    <div
                        className='w-fit sm:w-fit'
                    >
                        <Dropdown
                            label="Filters"
                            className=""
                        >
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
                            onClick={(e) => {
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
