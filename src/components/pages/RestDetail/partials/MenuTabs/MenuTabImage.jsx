import React from 'react'

export default function MenuTabImage({
    className = "",
    alt="",
    src = ""
}) {
  return (
    <>
        <img
            className={className}
            alt={alt}
            src={src}
        />
    </>
  )
}
