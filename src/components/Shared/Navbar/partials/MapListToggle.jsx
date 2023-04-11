import React, {useTransition} from 'react'

// react-icons
import { FaMapMarkedAlt, FaListUl } from 'react-icons/fa'

export default function MapListToggle({showMap, setShowMap}) {
    const [isPending, startTransition] = useTransition()
    const toggleMapListFunction = () => {
        startTransition(()=>{setShowMap(prev => !prev)})
    }
    return (
        <div
            className='flex flex-col justify-center items-center ml-2'
        >
            {
                showMap ?
                    <>
                        <button
                            onClick={toggleMapListFunction}
                        >
                            <FaListUl />
                        </button>
                    </>
                    :
                    <>
                        <button
                            onClick={toggleMapListFunction}
                        >
                            <FaMapMarkedAlt />
                        </button>
                    </>
            }
        </div>
    )
}
