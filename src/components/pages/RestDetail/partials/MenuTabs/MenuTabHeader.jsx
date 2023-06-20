import React from 'react'

export default function MenuTabHeader({
    className = "", 
    header = "",
    onClick = null
}) {
  return (
    <div
        className={className}
        onClick={onClick}
    >{header}</div>
  )
}
