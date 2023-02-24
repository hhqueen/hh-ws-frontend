import React, { useEffect, useState } from 'react'
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar, CartesianGrid } from 'recharts'
import axios from 'axios'
import { useImmer } from 'use-immer'
import LoadingComp from '../../../LoadingComp'

export default function TopThreeCitiesBarGraph() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useImmer({
    useTopNumCities: true
  })
  const [topNumCities, setTopNumCities] = useState(3)
  const [xyAxis, setXYAxis] = useImmer({
    xAxisTitle: "",
    yAxisTitle: "",
    dataKey: ""
  })
  const [rawData, setRawData] = useState([])
  const [showData, setShowData] = useState([])

  // initial data fetch
  useEffect(() => {
    setIsLoading(true)
    const executeFetch = async () => {
      try {
        // console.log("fetching Bargraph data")
        const fetchedData = await axios.get(`${process.env.REACT_APP_SERVER_URL}/analytics/RestaurantsPerCity`)
        setRawData(fetchedData.data)
      } catch (error) {
        console.log(error)
      }
    }
    executeFetch()
  }, [])

  // apply filters and params
  useEffect(() => {
    let data = []
    // console.log("rawData:",rawData)
    // only execute if data exists
    if (rawData.length > 0) {
      // auto set the x axis and data key
      const keytoAxis = Object.keys(rawData[0])
      // console.log("keytoAxis:",keytoAxis)
      setXYAxis((draft) => {
        draft.xAxisTitle = keytoAxis[0]
        draft.dataKey = keytoAxis[1]
      })

      let numCitiesToShow = 0
      if (settings.useTopNumCities) {
        numCitiesToShow = topNumCities
      } else {
        numCitiesToShow = rawData.length
      }
      // shows top i number of cities based on state, to be input later (WIP)
      for (let i = 0; i < numCitiesToShow; i++) {
        data.push(rawData[i])
      }
    }
    setShowData(data)
    setIsLoading(false)
  }, [rawData, topNumCities, settings])
  if (isLoading) return <LoadingComp />
  return (
    <>
      <div
        className='flex flex-col mt-10'
      >
        <div
          className='flex text-center justify-center'
        >
          <div
            className='flex items-center justify-center'
          >
            <input
              name='useTopNumCities'
              type="checkbox"
              checked={settings.useTopNumCities}
              onChange={(e) => {
                console.log("click")
                setSettings((draft) => { draft.useTopNumCities = !settings.useTopNumCities })
              }}
            />
          </div>


          <label>
            Show top
            <input
              className='h-[25px] w-[70px] text-center ml-3 rounded-md object-center'
              type="number"
              value={topNumCities}
              onChange={(e) => {
                let numtoSet = 0
                if (e.target.value > rawData.length) {
                  numtoSet = rawData.length
                } else {
                  numtoSet = e.target.value
                }
                setTopNumCities(numtoSet)
              }}
            /> {`cities. Max: ${rawData.length}`}
          </label>
        </div>

        <BarChart
          width={700}
          height={300}
          data={showData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xyAxis.xAxisTitle} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={xyAxis.dataKey} fill="#8884d8" />
        </BarChart>
      </div>
    </>

  )
}
