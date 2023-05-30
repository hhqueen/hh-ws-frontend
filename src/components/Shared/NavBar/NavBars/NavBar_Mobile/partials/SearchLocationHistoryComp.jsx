import React from 'react'
import { useNavigate } from 'react-router-dom'
import appendSearchHistory from '../../../../../../helperFunctions/appendSearchHistory'

export default function SearchLocationHistoryComp({
  searchParams,
  setSearchParams,
  setAddressState,
  unfocusAll,
  locationHistoryArr = []
}) {
  const navigate = useNavigate()

  // console.log("locationHistoryArr", locationHistoryArr)

  const handleOnClick = (item) =>{
    setSearchParams(draft=>{draft.address = item})
    setAddressState(item)
    appendSearchHistory(searchParams.searchTerm, item)
    navigate("/restaurants/")
  }

  const renderLocHistory = locationHistoryArr.map(item => {
    return (
      <>
        <div
          className='w-full border pl-[25%] py-2'
          onClick={() => {
            console.log(`location: ${item} clicked`)
            handleOnClick(item)
            unfocusAll()
          }}
        >{item}</div>
      </>
    )
  })


  return (
    <>
      <ul
        className='flex flex-col'
      >
        {renderLocHistory}
        {/* <div>SearchLocationHistoryComp</div> */}
      </ul>
      {/* <div>123</div> */}
    </>
  )
}
