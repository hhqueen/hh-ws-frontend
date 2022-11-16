import React from 'react'
import { Modal } from 'flowbite-react'
import { useImmer } from "use-immer"
import { Checkbox, Label } from 'flowbite-react'


import { dowList } from "../../sourceData/dowList"

const date = require('date-and-time');

let initDaysArr = []
dowList.forEach((dow, idx) => {
    initDaysArr.push({ dayIdx: idx, dayText: dow, updateBool: idx < 5 ? true : false })
})

export default function BulkHoursUpdateModal({ handleFormSubmit, bulkHourModalOpen, setBulkHourModalOpen }) {
    const [daysArr, setDaysArr] = useImmer(initDaysArr)

    const [hourData, setHourData] = useImmer({
        hasHH1: true,
        start1: 15,
        end1: 18,
        end1close: false,
        hasHH2: false,
        start2: 22,
        end2: 0,
        end2close: false
    })

    const handleHourInputChange = (e) => {
        setHourData((draft) => {
            const hour = Number(date.transform(e.target.value, "HH:mm", "H"))
            let minute = Number(date.transform(e.target.value, "HH:mm", "mm"))
            if (minute > 0 ) {
                minute = minute/60
            }
            draft[e.target.name] = hour + minute
        })
    }


    return (
        <Modal
            show={bulkHourModalOpen}
            onClose={() => { setBulkHourModalOpen(false) }}
        >
            <Modal.Header>
                Bulk Hours Update Modal
            </Modal.Header>
            <Modal.Body>
                <div
                className='flex flex-col'
                >
                        <div
                            className='grid grid-cols-3 py-3'
                        >
                            {
                                daysArr.map((day, idx) => {
                                    return (
                                        <>

                                            <Label>
                                                <Checkbox
                                                    name={day.dayText}
                                                    checked={daysArr[idx].updateBool}
                                                    onChange={(e) => setDaysArr(
                                                        (draft) => {
                                                            const foundDay = draft.find(item => item.dayIdx == idx)
                                                            foundDay.updateBool = e.target.checked
                                                        }
                                                    )}
                                                />{day.dayText}</Label>
                                        </>
                                    )
                                })
                            }
                        </div>

                        <div>
                            <Label>
                                <Checkbox
                                    name='hasHH1'
                                    checked={hourData.hasHH1}
                                    onChange={(e) => setHourData(
                                        (draft) => { draft.hasHH1 = e.target.checked }
                                    )}
                                />Happy Hour</Label>
                            <div>
                                <input
                                    className="min-w-[50px] text-xs"
                                    name="start1"
                                    type="time"
                                    defaultValue="15:00"
                                    onChange={(e) => handleHourInputChange(e)}
                                    disabled={hourData.hasHH1 === false}
                                />

                                <input
                                    className="min-w-[50px] text-xs"
                                    name="end1"
                                    type="time"
                                    defaultValue="18:00"
                                    onChange={(e) => handleHourInputChange(e)}
                                    disabled={hourData.hasHH1 === false || hourData.end1close === true}
                                />
                            </div>

                        </div>

                        <div>
                            <Label>
                                <Checkbox
                                    checked={hourData.hasHH2}
                                    onChange={(e) => setHourData(
                                        (draft) => { draft.hasHH2 = e.target.checked }
                                    )}

                                />Late Night</Label>
                            <div
                                className='flex'
                            >

                                <input
                                    className="min-w-[50px] text-xs"
                                    name="start2"
                                    type="time"
                                    defaultValue="21:00"
                                    onChange={(e) => handleHourInputChange(e)}
                                    disabled={hourData.hasHH2 === false}
                                />
                                {
                                    hourData.end2close ?

                                        <div
                                            className="min-w-[50px]  w-[110px] text-center "
                                        >
                                            to Close
                                        </div>
                                        :
                                        <input
                                            className="min-w-[50px] text-xs"
                                            name="end2"
                                            type="time"
                                            defaultValue="00:00"
                                            onChange={(e) => handleHourInputChange(e)}
                                            disabled={hourData.hasHH2 === false || hourData.end2close === true}
                                        />
                                }
                                <div>
                                    <Label>
                                        <Checkbox
                                            checked={hourData.end2close}
                                            onChange={(e) => setHourData(
                                                (draft) => { draft.end2close = e.target.checked }
                                            )}

                                        />Til-Close</Label>
                                </div>
                            </div>
                        </div>


                </div>
            </Modal.Body>
            <Modal.Footer>
            <button
                            type='submit'
                            className='border rounded-xs'
                            onClick={(e) => handleFormSubmit(e, daysArr, hourData)}
                        >
                            Submit
                        </button>
            </Modal.Footer>
        </Modal>
    )
}
