

export default function TopRestaurants({restVisitCountArr}) {
  console.log("restVisitCountArr(topRestaurants):", restVisitCountArr)     
  
  const listMap = restVisitCountArr.map((item, idx)=>{
    return (
      <li>{idx+1}. {item.restData.name} - {item.restData.city}, {item.restData.state} : {item.count}</li>
    )
  })
    return (
    <>
      <ul>
        {listMap}
      </ul>
    </>
  )
}
