import React from 'react'
import { useNavigate } from 'react-router-dom'
import appendSearchHistory from '../../../../../../helperFunctions/appendSearchHistory'


export default function SearchTermHistoryComp({
  searchParams,
  setSearchParams,
  setSearchTermState,
  unfocusAll,
  searchTermHistoryArr = []
}) {
  const navigate = useNavigate()
  
  const handleOnClick = (item) =>{
    setSearchParams(draft=>{draft.address = item})
    setSearchTermState(item)
    appendSearchHistory(searchParams.searchTerm, item)
    navigate("/restaurants/")
  }

  const renderSerachHistory = searchTermHistoryArr.map(item => {
    if(item === '') return ""
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

  if(searchTermHistoryArr == 0) return ""
  return (
    <>
    <ul
      className='flex flex-col'
    >
      {renderSerachHistory}
      {/* <div>SearchLocationHistoryComp</div> */}
    </ul>
    {/* <div>123</div> */}
  </>
  )
}
