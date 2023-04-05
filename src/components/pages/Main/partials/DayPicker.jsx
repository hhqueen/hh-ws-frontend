import React, {useContext, useTransition} from 'react'
import { DowContext } from "../../../context/DowContext"
import { dowMapping } from '../../../../sourceData/emptyDataTemplates'

export default function DayPicker({dow, setDow}) {
    const [isPending, startTransition] = useTransition()
    const DowContextVal = useContext(DowContext)
    const daysInWeek = 7
    console.log("dow:", dow)
    console.log("dowContext:", DowContextVal)
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
    const divUnpickedStyle = "flex border rounded-full h-[50px] w-[50px] p-3 justify-center items-center mx-3 hover:cursor-pointer"
    const divPickedStyle = "flex border rounded-full h-[50px] w-[50px] p-3 justify-center items-center mx-3 bg-purple-600 hover:cursor-pointer text-white"

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
    return (
        <div
            className='flex'
        >{renderDaysPicker}</div>
    )
}
