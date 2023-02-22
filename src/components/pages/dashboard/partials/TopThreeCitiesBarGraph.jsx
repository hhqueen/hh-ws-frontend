import React from 'react'
import { BarChart, ResponsiveContainer, XAxis, YAxis,Tooltip,Legend,Bar, CartesianGrid } from 'recharts'

const exampleData = [
  {
    name: "Los Angeles, CA - TEST",
    value: 100
  },
  {
    name: "Orange County, CA - TEST",
    value: 1000
  },
  {
    name: "Portland, OR - TEST",
    value: 10000
  }
]

export default function TopThreeCitiesBarGraph() {
  return (
    <>
      <ResponsiveContainer width={900} height="100%">
        <BarChart data={exampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

    </>
  )
}
