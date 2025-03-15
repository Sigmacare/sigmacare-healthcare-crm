import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function RoomDetails({ room }) {
  if (!room) {
    return <p>Select a room to view details</p>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room {room.number}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Type:</strong> {room.type}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <Badge variant={room.status === "Occupied" ? "destructive" : "default"}>{room.status}</Badge>
        </p>
        <p>
          <strong>Floor:</strong> {room.floor}
        </p>
        <p>
          <strong>Department:</strong> {room.department}
        </p>
        {room.status === "Occupied" && (
          <>
            <h4 className="font-semibold mt-4">Patient Information</h4>
            <p>
              <strong>Name:</strong> John Doe
            </p>
            <p>
              <strong>Age:</strong> 45
            </p>
            <p>
              <strong>Condition:</strong> Stable
            </p>
            <p>
              <strong>Assigned Doctor:</strong> Dr. Smith
            </p>
          </>
        )}
        <h4 className="font-semibold mt-4">Equipment</h4>
        <ul className="list-disc list-inside">
          <li>Oxygen Supply: Available</li>
          <li>Ventilator: Not Available</li>
          <li>Heart Monitor: Available</li>
        </ul>
        <p className="mt-4">
          <strong>Last Cleaned:</strong> 2023-05-15 14:30
        </p>
      </CardContent>
    </Card>
  )
}

