import {useState, useEffect} from 'react'

export default function Checkbox({data, filterParams, setFilterParams,idx}) {
    const [checkState, setCheckState] = useState(false)
    
    useEffect(()=>{
        const tempState = filterParams
        tempState[idx].value = checkState
        setFilterParams(tempState)
        console.log(data)
    },[checkState])

    const handleChecking = () => {
        setCheckState(!checkState)
    }

  return (
    <>
        <label
        htmlFor={data.name}
        >
            <input
                type="checkbox"
                id={data.name}
                checked={checkState}
                onChange={handleChecking}
            />
        {data.display}
        </label>
    </>
  )
}
