// Libraries
import {useState} from 'react'
import { checkboxFilters }  from "../../sourceData/filters"
import { dowList } from "../../sourceData/dowList"
// import {useQuery} from "@tanstack/react-query"

// Components
import Checkbox from '../Checkbox'
import ModalForArray from '../ModalForArray'

export default function AddRest() {
    const [filterParams, setFilterParams] = useState(checkboxFilters)
    const [searchRestBool , setSearchRestBool] = useState(true)
    const [yelpRestData, setYelpRestData] = useState({})
    
    const hhHoursMap = dowList.map((day) => {
        return (
            <li
                className='grid grid-cols-auto'
            >
                <div>{day}</div>
                <div>
                    
                    <label
                        htmlFor={`${day}Hour1`}
                    >Happy Hour
                        <input
                            id={`${day}Hour1`}
                            min={0}
                            max={12}
                            type="number"
                            step={0.25}
                            className='border'
                            defaultValue={4}
                        />
                    </label>
                    <label
                        htmlFor={`${day}Minute1`}
                    >
                        <input
                            id={`${day}Minute1`}
                            min={0}
                            max={59}
                            type="number"
                            step={1}
                            className='border'
                            defaultValue={0}
                        />
                    </label>
                    <label
                        htmlFor='ampm'
                    >
                        <select
                            id='ampm'
                            name='ampm'
                        >
                            <option value="PM">PM</option>
                            <option value="AM">AM</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label
                        htmlFor={`${day}Hour2`}
                    >Late Night
                        <input
                            id={`${day}Hour2`}
                            min={0}
                            max={12}
                            type="number"
                            step={0.25}
                            className='border'
                            defaultValue={4}
                        />
                    </label>
                    <label
                        htmlFor={`${day}Minute2`}
                    >
                        <input
                            id={`${day}Minute2`}
                            min={0}
                            max={59}
                            type="number"
                            step={1}
                            className='border'
                            defaultValue={0}
                        />
                    </label>
                    <label
                        htmlFor='ampm'
                    >
                        <select
                            id='ampm'
                            name='ampm'
                        >
                            <option value="PM">PM</option>
                            <option value="AM">AM</option>
                        </select>
                    </label>
                </div>
            </li>
        )
    })

    const options = checkboxFilters
    console.log("options",options)

    const filtersMap = filterParams.map((filterVal, idx) => {
        return (
            <li>
                <Checkbox
                    idx={idx}
                    filterParams={filterParams}
                    data={filterVal}
                    setFilterParams={setFilterParams}
                />
            </li>
           
        )
    })

    return (
        <div
        className='ml-10'
        >
            <h1>Add New Restaurant Page</h1>
            <form
            onSubmit={''}
            >
                {/* div that holds yelp search input */}
                <div>
                    {
                    searchRestBool ?
                    // {/* search container */}
                    <div>
                        <label
                            htmlFor='yelpSearchTerm'
                        >Search Term</label>
                        <input
                            id='yelpSearchTerm'
                            className='border'
                            type="input"
                        />
                        <label
                            htmlFor='yelpSearchLoc'
                        >Search Term</label>
                        <input
                            id='yelpSearchLoc'
                            className='border'
                            type="input"
                        />
                    </div>
                    :
                    // {/* results Container */}
                    <div>
                        
                    </div>
                    }

                    <button></button>
                </div>

                {/* div that holds options input */}
                <div>
                    <ul>
                        {filtersMap}
                    </ul>
                </div>

                {/* div that holds hours input */}
                <div>
                    <ul
                        className=''
                    >
                        {/* <p>Day</p>
                        <p>Happy Hour</p>
                        <p>Late Night</p> */}
                        {hhHoursMap}
                    </ul>
                </div>
                
                {/* div that holds menu input */}
                <div>
                    
                </div>
            </form>
        </div>
    )
}
