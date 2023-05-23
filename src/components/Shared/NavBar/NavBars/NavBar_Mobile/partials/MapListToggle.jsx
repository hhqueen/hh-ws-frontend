import React, { useTransition } from 'react'


// react-icons
import { FaMapMarkedAlt, FaListUl } from 'react-icons/fa'

export default function MapListToggle({ showMap, setShowMap }) {
    const [isPending, startTransition] = useTransition()
    const toggleMapListFunction = () => {
        startTransition(() => { setShowMap(prev => !prev) })
    }
    // renders if not on landing page
    if (window.location.pathname == "/") return 
    
    return (
        <div
            className='flex flex-col justify-center items-center ml-2'
        >
            <button
                onClick={showMap ? toggleMapListFunction : toggleMapListFunction}
            >
                {showMap ? <FaListUl /> : <FaMapMarkedAlt />}
            </button>
        </div>
    )
}
