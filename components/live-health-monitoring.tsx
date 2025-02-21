"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { time: "00:00", heartRate: 72, bloodPressure: 120, oxygenLevel: 98 },
  { time: "04:00", heartRate: 68, bloodPressure: 118, oxygenLevel: 97 },
  { time: "08:00", heartRate: 70, bloodPressure: 122, oxygenLevel: 99 },
  { time: "12:00", heartRate: 75, bloodPressure: 125, oxygenLevel: 98 },
  { time: "16:00", heartRate: 72, bloodPressure: 121, oxygenLevel: 98 },
  { time: "20:00", heartRate: 70, bloodPressure: 119, oxygenLevel: 97 },
]

export function LiveHealthMonitoring() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Health Monitoring</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
              <Line type="monotone" dataKey="bloodPressure" stroke="#82ca9d" />
              <Line type="monotone" dataKey="oxygenLevel" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

