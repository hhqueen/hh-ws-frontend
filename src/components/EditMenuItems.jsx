import React from 'react'
import { menuDiscountType } from "../sourceData/menuDiscountType"

export default function EditMenuItems({ ItemsArr, menuType, handleRemove = null }) {

    const ItemsMap = ItemsArr.map((item, idx) => {
        // console.log(item)
        const priceStringFunction = (value, id) => {
            if (id = 1) {
                return (
                    <>
                        <div
                        className='flex'
                        >
                            <input
                            name='specialTypeId'
                            value={`${menuDiscountType[id]}`}
                            />
                            <input
                                name="value"
                                value={`${value}`}
                            />
                        </div>
                    </>
                )
            } else if (id = (2 || 3)) {
                return (
                    <>
                        <div
                        className='flex'
                        >
                            <input
                                value={`${value}`}
                            />
                            <input
                            value={`${menuDiscountType[id]}`}
                            />
                        </div>
                    </>
                )
            }
        }
        const priceString = priceStringFunction(item.value, item.specialTypeId)
        return (
            <li
                className='flex flex-col text-xs justify-center items-center my-3'
            >
                <label
                    htmlFor={`${idx}${item.Type}-nameInput`}
                >Name
                    <input
                        id={`${idx}${item.Type}-nameInput`}
                        className='text-xs text-center border'
                        value={item.name}
                    />
                </label>

                <label
                    htmlFor={`${idx}${item.Type}-DescriptionInput`}
                >Description
                    <textarea
                        className='text-xs text-center border'
                        value={item.description}
                    />
                </label>

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
