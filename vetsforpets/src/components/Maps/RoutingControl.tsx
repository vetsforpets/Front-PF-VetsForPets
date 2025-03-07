"use client";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

interface RoutingControlProps {
  origin: [number, number];
  destination: [number, number];
}


interface MyRoutingControlOptions extends L.Routing.RoutingControlOptions {
  createMarker?: (
    i: number,
    waypoint: L.Routing.Waypoint,
    n: number
  ) => L.Marker | null;
}

const RoutingControl = ({ origin, destination }: RoutingControlProps) => {
  const map = useMap();

  useEffect(() => {
    if (!origin || !destination) return;

    
    const options: MyRoutingControlOptions = {
      waypoints: [
        L.latLng(origin[0], origin[1]),
        L.latLng(destination[0], destination[1])
      ],
      lineOptions: {
        styles: [{ color: "blue", opacity: 0.6, weight: 4 }],
        extendToWaypoints: false,
        missingRouteTolerance: 0
      },
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      showAlternatives: false,

      // para ocultar los íconos de los waypoints que viene por defecto
      createMarker: () => null,
    };

    // Forzamos el casting a L.Routing.RoutingControlOptions
    const routingControl = L.Routing.control(options as L.Routing.RoutingControlOptions).addTo(map);

    // Ocultar el contenedor para no ver el panel de instrucciones
    const container = routingControl.getContainer();
    if (container) {
      container.style.display = "none";
    }

    return () => {
      try {
        routingControl.getPlan().setWaypoints([]);
        map.removeControl(routingControl);
      } catch (error) {
        console.error("Error removing routing control:", error);
      }
    };
  }, [map, origin, destination]);

  return null;
};

export default RoutingControl;



