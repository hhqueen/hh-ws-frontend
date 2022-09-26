import {useState} from 'react'
import Checkbox from './Checkbox'

export default function FilterComp({filterParams,setFilterParams, filterFormSubmitHandler}) {    

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
                <form
                    onSubmit={(e)=>{
                        filterFormSubmitHandler(e)
                    }}
                >
                    
                    <button
                    type='submit'
                    >APPLY</button>
                    
                    <p>Filters</p>
                    <ul>
                        {filtersMap}
                    </ul>
                </form>
            </div>

        </>
    )
}
