import React from 'react'
import { Button } from 'flowbite-react'

export default function Profile_v1({ profileState, handleSubmit }) {

    const renderInputs = profileState.map((item) => {
        return (
            <>
                {/* 'grid grid-cols-2 grid-rows-1' */}
                <label
                    htmlFor={item.id}
                    className={item.labelClassName}
                >
                    <p>{item.displayName}</p>
                    <input
                        id={item.id}
                        name={item.id}
                        type={item.inputType}
                        className={item.inputClassName}
                        value={item.value}
                        checked={item.checked}
                        onChange={item.onChange}
                        disabled={item.disabled}
                    />
                </label>
            </>
        )
    })

    return (
        <>
            <section
                className='flex flex-col justify-center items-center'
            >

                <div
                    className='flex flex-col items-center min-w-[50%]'
                >
                    {renderInputs}
                </div>
                <div
                    className='w-[100px]'
                >
                    <Button
                        onClick={handleSubmit}
                        className='border w-[200px] h-[50px] my-10'
                    >
                        Submit
                    </Button>
                </div>
            </section>
        </>
    )
}
