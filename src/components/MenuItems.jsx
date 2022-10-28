import React from 'react'
import {menuDiscountType} from "../sourceData/menuDiscountType"

export default function MenuItems({ItemsArr, menuType, handleRemove = null}) {
    
    const ItemsMap = ItemsArr.map((item,idx)=>{
        // console.log(item)
        const priceStringFunction = (value, id) => {
            if (id = 1) {
                return `${menuDiscountType[id]}${value}`
            } else if( id = (2 || 3)) {
                return `${value}${menuDiscountType[id]}`
            } 
        }
        const priceString = priceStringFunction(item.value, item.specialTypeId)
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
                    >{priceString}</p>

                    {
                        handleRemove != null && 
                        <>
                            <button
                            type="button"
                            onClick={(e)=>{
                                handleRemove(e,item.Type,idx)

                            }}
                            >
                            Remove
                            </button>
                        </>
                    }
                    
            </li>
        )
    })
  
    return (
    <div>
        <ul>
            {ItemsMap}
        </ul>
    </div>
  )
}
