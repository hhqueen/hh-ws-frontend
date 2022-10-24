import { useState } from 'react'

export default function Checkbox({ data, filterParams, setFilterParams, idx }) {
    const [checkState, setCheckState] = useState(filterParams[idx].value)

    const handleChecking = () => {
        setCheckState(!checkState)
        const tempState = filterParams
        tempState[idx].value = !filterParams[idx].value
        setFilterParams(tempState)
    }

    return (
        <>
            <label
                className=''
                htmlFor={filterParams[idx].name}
            >
                <input
                    type="checkbox"
                    id={filterParams[idx].name}
                    checked={checkState}
                    onChange={handleChecking}
                />
                {data.display}
            </label>
        </>
    )
}
