import { dowList } from "../sourceData/dowList"
import { Select, Button, Dropdown,Checkbox } from "flowbite-react"

export default function FilterComp({ dow, setDow, filterParams, setFilterParams }) {

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
                <label
                    htmlFor={`${filterVal.name}_checkbox`}
                >
                <Checkbox
                    id={`${filterVal.name}_checkbox`}
                    checked={filterVal.value}
                    readOnly
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
                className='w-full sm:w-64 grow pb-2 sticky mt-[180px] bg-white dark:bg-gray-800'
                aria-label='Sidebar'
            >
                    <div
                        className='flex justify-center sm:overflow-y-auto sm:py-4 sm:px-3 '
                    >
                        <label
                            className='w-[50%]'
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
                            >
                            {filtersMap}
                            </Dropdown>
                        </div>
                    </div>
            </aside>
        </>
    )
}
