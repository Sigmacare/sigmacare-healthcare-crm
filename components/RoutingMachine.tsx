import { useEffect } from "react"
import { useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet-routing-machine"
import "leaflet-routing-machine/dist/leaflet-routing-machine.css"

interface RoutingMachineProps {
    from: { lat: number, lng: number }
    to: { lat: number, lng: number }
}

const RoutingMachine = ({ from, to }: RoutingMachineProps) => {
    const map = useMap()

    useEffect(() => {
        if (!map) return

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(from.lat, from.lng),
                L.latLng(to.lat, to.lng)
            ],
            lineOptions: {
                styles: [{ color: 'blue', weight: 4 }]
            },
            show: false,
            addWaypoints: false,
            routeWhileDragging: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            createMarker: () => null,
        }).addTo(map)

        return () => {
            map.removeControl(routingControl)
        }
    }, [map, from, to])

    return null
}

export default RoutingMachine