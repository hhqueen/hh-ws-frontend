import React from 'react'
import { FaDirections } from "react-icons/fa"
import { TbPhoneCall } from "react-icons/tb"

export default function AddressPhoneNumber({
    address = "",
    addressHref = "",
    addressClassName = "",
    phoneNum = "",
    phoneNumHref = "",
    phoneNumClassName = ""
}) {
    return (
        <>
            <div>
                <a
                    href={addressHref}
                    target="_blank"
                    className="flex"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                        // apiLogger(e, componentName, `a_Address_RestaurantId: ${id}`)
                    }}
                >
                    <FaDirections />
                    <p
                        className={addressClassName}
                    >{address}</p>
                </a>
                <a
                    href={phoneNumHref}
                    className="flex"
                    onClick={(e) => {
                        // apiLogger(e, componentName, `a_PhoneNumber_RestaurantId: ${id}`)
                    }}
                >
                    <TbPhoneCall />
                    <p
                        className={phoneNumClassName}
                    >{phoneNum}</p>
                </a>
            </div>
        </>
    )
}
