import {useState} from 'react'
import Checkbox from './Checkbox'

export default function FilterComp({filterParams,setFilterParams}) {    
    // const filters = [
    //     { name: "dogFriendly", display: "Dog Friendly" },
    //     { name: "hasPatio", display: "Patio" },
    //     { name: "hasFood", display: "Food" },
    //     { name: "roofTop", display: "Roof Top" },
    // ]


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

    return (
        <>
            <div
                className='border w-[25vw]'
            >
                <p>Filters</p>
                <ul>
                    {filtersMap}
                </ul>
            </div>

        </>
    )
}
