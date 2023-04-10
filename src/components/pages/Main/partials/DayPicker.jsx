import React, {useContext, useTransition} from 'react'
import { GlobalStateContext } from '../../../context/GlobalStateContext'
import { dowMapping } from '../../../../sourceData/emptyDataTemplates'

export default function DayPicker({setDow}) {
    const [isPending, startTransition] = useTransition()
    const DowContextVal = useContext(GlobalStateContext.dow)
    const daysInWeek = 7
    let daysPick = [

    ]
    for (let i = 0; i < daysInWeek; i++) {
        const dayObj = {
            dayNum: null,
            picked: false
        }
        const day = dayObj
        day.dayNum = i
        daysPick.push(day)
    }
    const divUnpickedStyle = "flex border rounded-full h-[45px] w-[45px] justify-center items-center mx-1 text-black bg-purple-300 hover:bg-purple-400 hover:cursor-pointer"
    const divPickedStyle = "flex border rounded-full h-[45px] w-[45px] justify-center items-center mx-1 bg-purple-600 hover:cursor-pointer text-white"

    const renderDaysPicker = daysPick.map((day) => {
        let dayLong = dowMapping[day.dayNum].long
        let chosenDay = DowContextVal
        return (
            <>
                <div
                    className={dayLong === chosenDay ? divPickedStyle : divUnpickedStyle}
                    onClick={()=>{
                        startTransition(()=>{setDow(dayLong)})
                    }}
                >
                    {dowMapping[day.dayNum].medium}
                </div>
            </>
        )
    })
    // if(isPending) return <LoadingComp/>
    return (
        <div
            className='flex w-fit'
        >{renderDaysPicker}</div>
    )
}
