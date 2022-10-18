import React from 'react'

export default function MenuItems({ItemsArr, menuType}) {
    
    
    const ItemsMap = ItemsArr.map((item)=>{
        // console.log(item)
        return(
            <li
            className='flex flex-col text-xs justify-center items-center my-3'
            >
                    <p
                    className='text-xs text-center'
                    >{item.name}</p>
                    
                    <p
                    className='text-xs text-center'
                    >{item.description}</p>
                    
                    <p
                    className='text-xs text-center'
                    >${item.price}</p>
            </li>
        )
    })
  
    return (
    <div>
        <p
        className='flex justify-center'
        >{menuType} Menu</p>
        <ul>
            {ItemsMap}
        </ul>
    </div>
  )
}
