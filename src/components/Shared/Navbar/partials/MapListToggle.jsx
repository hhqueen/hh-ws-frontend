import React from 'react'

// react-icons
import { FaMapMarkedAlt, FaListUl } from 'react-icons/fa'

export default function MapListToggle({showMap, setShowMap}) {
    return (
        <div
            className='flex flex-col justify-center items-center ml-2'
        >
            {
                showMap ?
                    <>
                        <button
                            onClick={() => { setShowMap(false) }}
                        >
                            <FaListUl />
                        </button>
                    </>
                    :
                    <>
                        <button
                            onClick={() => { setShowMap(true) }}
                        >
                            <FaMapMarkedAlt />
                        </button>
                    </>
            }
        </div>
    )
}
