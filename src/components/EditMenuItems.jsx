import React from 'react'
import { menuDiscountType } from "../sourceData/menuDiscountType"
import { Select } from 'flowbite-react'

const priceStringFunction = (item, idx, handleInputChange) => {
    if (item.specialTypeId == 1) {
        return (
            <>
                <div
                    className='flex'
                >
                    {/* <input
                    name='specialTypeId'
                    value={`${menuDiscountType[id]}`}
                    onChange={()=>{handleInputChange(e, item.Type, idx)}}
                    /> */}
                    <Select
                        name='specialTypeId'
                        className='text-center'
                        onChange={(e) => { handleInputChange(e, item.Type, idx) }}
                    >
                        {
                            Object.entries(menuDiscountType).map((discount) => {
                                return <option value={discount[0]} selected={item.specialTypeId===discount[0]}>{discount[1]}</option>
                            })
                        }
                    </Select>
                    <input
                        name="value"
                        className='text-center w-[5rem] border rounded-sm'
                        value={`${item.value}`}
                        onChange={(e) => { handleInputChange(e, item.Type, idx) }}
                    />
                </div>
            </>
        )
    } else if (item.specialTypeId == 2 || 3) {
        return (
            <>
                <div
                    className='flex'
                >
                    <input
                        name="value"
                        className='text-center w-[5rem] border rounded-sm'
                        value={`${item.value}`}
                        onChange={(e) => { handleInputChange(e, item.Type, idx) }}
                    />
                    <Select
                        name='specialTypeId'
                        className=''
                        onChange={(e) => { handleInputChange(e, item.Type, idx) }}
                    >
                        {
                            Object.entries(menuDiscountType).map((discount) => {
                                return <option value={discount[0]} selected={item.specialTypeId===discount[0]}>{discount[1]}</option>
                            })
                        }
                    </Select>
                </div>
            </>
        )
    }
}

export default function EditMenuItems({ ItemsArr, menuType, handleInputChange, handleRemove = null }) {

    const ItemsMap = ItemsArr.map((item, idx) => {
        // console.log(item)

        const priceString = priceStringFunction(item, idx, handleInputChange)
        const menuDiscountTypeEntriesArr = Object.entries(menuDiscountType)
        return (
            <li
                className='flex flex-col text-xs justify-center items-center py-3'
            >
                <label
                    htmlFor={`${idx}${item.Type}-nameInput`}
                >
                    <input
                        id={`${idx}${item.Type}-nameInput`}
                        className='text-xs text-center border'
                        name="name"
                        placeholder='Item Name'
                        value={item.name}
                        onChange={(e) => { handleInputChange(e, item.Type, idx) }}
                    />
                </label>

                <label
                    htmlFor={`${idx}${item.Type}-DescriptionInput`}
                >
                    <textarea
                        className='text-xs text-center border'
                        name="description"
                        placeholder='Description'
                        value={item.description}
                        onChange={(e) => { handleInputChange(e, item.Type, idx) }}
                    />
                </label>



                {/* <input
                    name='specialTypeId'
                    value={`${menuDiscountType[id]}`}
                    onChange={(e)=>{handleInputChange(e, item.Type, idx)}}
                    /> */}
                {/* <select
                    name='specialTypeId'
                    onChange={(e) => { handleInputChange(e, item.Type, idx) }}
                >
                    {
                        Object.entries(menuDiscountType).map((discount) => {
                            return <option value={discount[0]}>{discount[1]}</option>
                        })
                    }
                </select> */}


                {priceString}


                <button
                    type="button"
                    onClick={(e) => {
                        handleRemove(e, item.Type, idx)
                    }}
                >
                    Remove
                </button>


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
