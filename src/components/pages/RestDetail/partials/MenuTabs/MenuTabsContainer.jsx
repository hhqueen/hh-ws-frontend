import React, {useState, useEffect} from 'react'
import { useImmer } from 'use-immer'
import LoadingComp from '../../../../Shared/LoadingComp'
import MenuTabHeader from './MenuTabHeader'
import MenuTabImage from './MenuTabImage'

export default function MenuTabsContainer({
    menu = {},
    containerClassName = ""

}) {
  
    console.log("MenuTabContainer Menu:", menu)

    const [isLoaded, setIsloaded] = useState(false)
    const [menuIdx, setMenuIdx] = useState(0)
    const [menuArr, setMenuArr] = useImmer([])

    const foodAndDrinkMenuObj = {
        name:"foodAndDrinkMenuImg",
        headerDisplayName: "Food And Drink",
        imgUrl:""
    }

    const foodMenuObj = {
        name:"foodMenuImg",
        headerDisplayName: "Food",
        imgUrl:""
    }

    const drinkMenuObj = {
        name:"drinkMenuImg",
        headerDisplayName: "Drink",
        imgUrl:""
    }

    const isFoodAndDrinkMenu = menu?.isFoodAndDrinkMenu ?? false

    useEffect(()=>{
        let localMenuArr = []
        if(isFoodAndDrinkMenu) {
            foodAndDrinkMenuObj.imgUrl = menu[foodAndDrinkMenuObj.name].imgUrl
            localMenuArr.push(foodAndDrinkMenuObj)
        } else {
            if(menu[drinkMenuObj.name].imgUrl){
                drinkMenuObj.imgUrl = menu[drinkMenuObj.name].imgUrl
                localMenuArr.push(drinkMenuObj)
            }
            if(menu[foodMenuObj.name].imgUrl){
                foodMenuObj.imgUrl = menu[foodMenuObj.name].imgUrl
                localMenuArr.push(foodMenuObj)
            }
        }
        // console.log("localMenuArr", localMenuArr)
        setMenuArr(localMenuArr)
        setIsloaded(true)
    },[])

    const renderHeaderTabs = menuArr.map((tab,idx)=>{
        const selectedStyle = "text-center align-middle min-w-[100px] w-[15%] max-w-[200px] h-[40px] bg-slate-400"
        const unselectedStyle = "text-center align-middle min-w-[100px] w-[15%] max-w-[200px] h-[40px] bg-slate-100 hover:bg-slate-200"
        
        return(
            <>
                <MenuTabHeader
                    className={menuIdx == idx ? selectedStyle : unselectedStyle}
                    header={tab.headerDisplayName}
                    onClick={()=>{
                        console.log(`${tab.headerDisplayName} tab clicked`)
                        setMenuIdx(idx)
                    }}
                />
            </>
        )
    })

    if(isLoaded === false) return <LoadingComp/>
    return (
    <div
        className={containerClassName}
    >
        <div
            className='flex justify-center'
        >
            {renderHeaderTabs}
        </div>
        <div
            className='border rounded-2xl w-full'
        >
            <MenuTabImage
                className="w-full md:rounded-2xl"
                alt={`${menuArr[menuIdx]?.headerDisplayName} menu`}
                src={menuArr[menuIdx]?.imgUrl}
            />
        </div>
    </div>
  )
}
