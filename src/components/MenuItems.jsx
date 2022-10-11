import React from 'react'

export default function MenuItems({ItemsArr, menuType}) {
    const ItemsMap = ItemsArr.map((item)=>{
        return(
            <li
                className='my-3'
            >
                    <p
                    className='text-xs'
                    >{item.name}</p>
                    <p
                    className='text-xs'
                    >
                        {
                            item.description ? <p>{item.description}</p> : ""
                        }
                    </p>
                    <p
                    className='text-xs'
                    >${item.price}</p>
            </li>
        )
    })
  
    return (
    <div>
        <p>{menuType} Menu</p>
        <ul>
            {ItemsMap}
        </ul>
    </div>
  )
}
