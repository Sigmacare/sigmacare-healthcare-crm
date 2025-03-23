import React, { useEffect, useState } from "react"
import { Patient } from "../page"
import { DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import HealthMetricsChart from "./HealthMetricsChart"

type PatientDetailsProps = {
    patient: Patient
    onDelete: (id: string) => void
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, onDelete }) => {
    const [heartRateData, setHeartRateData] = useState<{ time: string; value: number }[]>([])
    const [oxygenLevelData, setOxygenLevelData] = useState<{ time: string; value: number }[]>([])
    const [status, setStatus] = useState<string>("Connecting...")
    const [averageHeartRate, setAverageHeartRate] = useState<number>(0)
    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        const wsUrl = process.env.NEXT_PUBLIC_CONSUMER_PROXY_URL;
        if (!wsUrl) {
            console.error("WebSocket URL is not defined");
            setStatus("WebSocket URL is not defined");
            return;
        }
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            setStatus("Connected successfully")
            console.log("Connected to the WebSocket server")
            ws.send(JSON.stringify({ type: "subscribe", device_id: patient.device_id })) // Send device_id to the server
        }

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log("Received data from the WebSocket server: ", data)

            if (data.device_code === patient.device_id) {
                const time = new Date().toLocaleTimeString()
                setHeartRateData((prev) => [...prev.slice(-23), { time, value: data.heartRate }])
                setOxygenLevelData((prev) => [...prev.slice(-23), { time, value: data.oxygen }])

                const avgHR = [...heartRateData, { time, value: data.heartRate }].reduce((sum, val) => sum + val.value, 0) / (heartRateData.length + 1)
                setAverageHeartRate(avgHR)
            }
        }

        ws.onclose = () => {
            setStatus("Disconnected")
        }

        ws.onerror = (error) => {
            console.error("WebSocket Error: ", error)
            setStatus("Connection Error")
        }

        setSocket(ws)

        return () => {
            ws.close()
        }
    }, [patient.device_id])

    return (
        <>
            <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right">Name</Label>
                        <div>{patient.name}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right">Age</Label>
                        <div>{patient.age}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right">Condition</Label>
                        <div>{patient.medical_conditions.join(", ")}</div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right">Device ID</Label>
                        <div>{patient.device_id || "N/A"}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right">Status</Label>
                        <div>{status}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right">Avg Heart Rate (Live)</Label>
                        <div>{averageHeartRate.toFixed(2)} bpm</div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <HealthMetricsChart
                        data={heartRateData}
                        title="HeartRate"
                        color="rgba(255, 99, 132, 1)"
                    />
                </div>
                <div className="flex-1">
                    <HealthMetricsChart
                        data={oxygenLevelData}
                        title="SpO2"
                        color="rgba(54, 162, 235, 1)"
                    />
                </div>
            </div>

            <DialogFooter>
                <Button variant="destructive" onClick={() => onDelete(patient._id)}>
                    Delete
                </Button>
            </DialogFooter>
        </>
    )
}

export default PatientDetails