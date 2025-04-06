import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

type HealthMetricsChartProps = {
    data: { time: string; HeartRate: number }[] | { time: string; SpO2: number }[]
    title: string
    color: string
}

const HealthMetricsChart: React.FC<HealthMetricsChartProps> = ({ data, title, color }) => {
    console.log(data)
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={title} stroke={color} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default HealthMetricsChart