import React from 'react'

export default function TitleCuisineFilters({
    containerDivClassName = "",
    name = "",
    nameClassName = "",
    cuisines = "",
    cuisinesClassName = "",
    filters = "",
    filtersClassName = ""
}) {
    return (
        <>
            <div
                className={containerDivClassName}
            >
                <p
                    className={nameClassName}
                >{name}</p>
                <p
                    className={cuisinesClassName}
                >{cuisines}</p>
                <p
                    className={filtersClassName}
                >{filters}</p>
            </div>
        </>
    )
}
