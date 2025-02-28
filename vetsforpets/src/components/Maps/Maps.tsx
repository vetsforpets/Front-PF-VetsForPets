"use client";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useState, useEffect, useMemo } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import Formulario from "./Form";
import RoutingControl from "./RoutingControl";
import { fetchUserData } from "@/services/servicesUser"; 
import { useUserStore } from "@/store";


interface Vet {
  lat: number;
  lon: number;
  nombre: string;
  nroDeTelefono: string
}

interface VetWithDistance extends Vet {
  distance: number;
}

const Map = () => {
  const { userData } = useUserStore();
  const [userPosition, setUserPosition] = useState<[number, number]>([-37.9900, -57.5500]);
  // Estado para la veterinaria más cercana 
  const [nearestVet, setNearestVet] = useState<VetWithDistance | null>(null);
  // Estado para la veterinaria seleccionada
  const [selectedVet, setSelectedVet] = useState<Vet | null>(null);

  // Con use memo, memoriza las veterinarias
  const veterinarias: Vet[] = useMemo(() => [
    { lat: -38.002, lon: -57.543, nombre: "Veterinaria Patitas", nroDeTelefono: "0223-1234567" },
    { lat: -38.000, lon: -57.555, nombre: "VetCare Mar del Plata", nroDeTelefono: "0223-2345678" },
    { lat: -37.995, lon: -57.560, nombre: "Clínica Veterinaria Alfredo", nroDeTelefono: "0223-3456789" },
    { lat: -38.008, lon: -57.540, nombre: "Veterinaria Layus", nroDeTelefono: "0223-4567890" },
    { lat: -38.003, lon: -57.555, nombre: "Mundo Animal Vet", nroDeTelefono: "0223-5678901" }
  ], []);


  useEffect(() => {
    const getUserLocation = async () => {
      if (userData?.id && userData?.token) {
        try {
          const userResponse = await fetchUserData(userData.id, userData.token);
          if (userResponse && userResponse.location && userResponse.location.length > 0) {
            // Asumimos que location es un arreglo y tomamos la primera ubicación
            setUserPosition([
              userResponse.location[0].latitude,
              userResponse.location[0].longitude,
            ]);
          }
        } catch (error) {
          console.error("Error al obtener la ubicación del usuario:", error);
        }
      }
    };

    getUserLocation();
  }, [userData?.id, userData?.token]);
  
  const actualizarUbicacionUsuario = (lat: number, lon: number) => {
    console.log("Nueva ubicación del usuario:", lat, lon);
    setUserPosition([lat, lon]);
    
    setSelectedVet(null);
  };

  // Calcular la veterinaria más cercana cada vez que userPosition cambie
  useEffect(() => {
    if (!userPosition) return;
    let minDistance = Infinity;
    let nearest: VetWithDistance | null = null;
    
    const userLatLng = L.latLng(userPosition[0], userPosition[1]);
    for (const vet of veterinarias) {
      const vetLatLng = L.latLng(vet.lat, vet.lon);
      
      const distance = userLatLng.distanceTo(vetLatLng) / 1000;
      
      if (distance < minDistance) {
        minDistance = distance;
        
        nearest = { ...vet, distance };
      }
    }
    setNearestVet(nearest);
  }, [userPosition, veterinarias]);


  const vetIcon = new L.Icon({
    iconUrl: "/google-maps.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  
  const userIcon = new L.Icon({
    iconUrl: "/street-viewUser.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  
  const handleVetClick = (vet: Vet) => {
    console.log("Veterinaria seleccionada:", vet);
    setSelectedVet(vet);
  };

  // Define cuál veterinara usar para la ruta
  // Si el usuario hace clic en una, se usa esa si no, se usa la más cercana.
  const destinationVet = selectedVet || nearestVet;

  return (
    <div>
      <div className="flex justify-center">
        <MapContainer center={[-38.000, -57.550]} zoom={12.4} style={{ width: "70%", height: "600px" }} zoomControl={false}>
          <ZoomControl position="topright" />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    
          {veterinarias.map((vet, index) => (
            <Marker
              key={index}
              position={[vet.lat, vet.lon]}
              icon={vetIcon}
              eventHandlers={{ click: () => handleVetClick(vet) }}
            >
              <Popup>
                🏥 {vet.nombre} <br />
                📞 {vet.nroDeTelefono}
              </Popup>
            </Marker>
          ))}

          
          <Marker position={userPosition} icon={userIcon}>
            <Popup>
              📍 Usted está aquí <br />
              Lat: {userPosition[0]} | Lon: {userPosition[1]}
            </Popup>
          </Marker>

          {/* Muestra la ruta entre el usuario y la veterinaria */}
          {userPosition && destinationVet && (
            <RoutingControl origin={userPosition} destination={[destinationVet.lat, destinationVet.lon]} />
          )}
        </MapContainer>

        <div className="m-8">
  <Formulario onUbicacionSeleccionada={actualizarUbicacionUsuario} />
  {destinationVet && (
    <div className="customInput">
      <h3 className="m-3 text-lg">Ruta hacia: {destinationVet.nombre}</h3>
      <p className="m-3 text-lg">📞 Teléfono: {destinationVet.nroDeTelefono}</p>
      {/* {nearestVet && destinationVet === nearestVet && (
        <p>Distancia: {nearestVet.distance.toFixed(2)} km (más cercana)</p>
      )} */}
      {userPosition && (
        <p className="m-3 text-lg">
          🏥 Distancia:{" "}
          {(
            L.latLng(userPosition[0], userPosition[1]).distanceTo(
              L.latLng(destinationVet.lat, destinationVet.lon)
            ) / 1000
          ).toFixed(2)}{" "}
          km
        </p>
      )}
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default Map;















// "use client";
// import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useState } from "react";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import Formulario from "./Form";

// const Map = () => {
//   // Estado para la ubicación del usuario
//   const [userPosition, setUserPosition] = useState<[number, number]>([-37.9900, -57.5500]);

//   // Estado para la veterinaria más cercana
//   const [nearestVet, setNearestVet] = useState<{
//     lat: number;
//     lon: number;
//     nombre: string;
//     distance: number;
//   } | null>(null);

//   // Veterinarias Hardcodeadas
//   const veterinarias = [
//     { lat: -38.002, lon: -57.543, nombre: "Veterinaria Patitas" },
//     { lat: -38.000, lon: -57.555, nombre: "VetCare Mar del Plata" },
//     { lat: -37.995, lon: -57.560, nombre: "Clínica Veterinaria San Roque" },
//     { lat: -38.008, lon: -57.540, nombre: "Huellitas Felices" },
//     { lat: -38.003, lon: -57.555, nombre: "Mundo Animal Vet" }
//   ];

//   // Función para actualizar la ubicación del usuario
//   const actualizarUbicacionUsuario = (lat: number, lon: number) => {
//     console.log("Nueva ubicación del usuario:", lat, lon);
//     setUserPosition([lat, lon]);

//     // Calcular la distancia con Leaflet
//     let minDistance = Infinity;
//     let nearest = null;

//     for (const vet of veterinarias) {
//       // 1. Creamos LatLng del usuario y de la veterinaria
//       const userLatLng = L.latLng(lat, lon);
//       const vetLatLng = L.latLng(vet.lat, vet.lon);

//       // 2. distanceTo() devuelve la distancia en METROS
//       const distanceInMeters = userLatLng.distanceTo(vetLatLng);
//       // 3. Convertimos a km
//       const distanceInKm = distanceInMeters / 1000;

//       if (distanceInKm < minDistance) {
//         minDistance = distanceInKm;
//         nearest = vet;
//       }
//     }

//     if (nearest) {
//       setNearestVet({ ...nearest, distance: minDistance });
//     }
//   };

//   // Iconos
//   const vetIcon = new L.Icon({
//     iconUrl: "/google-maps.svg",
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//   });

//   const userIcon = new L.Icon({
//     iconUrl: "/street-viewUser.svg",
//     iconSize: [32, 32],
//     iconAnchor: [16, 32],
//   });

//   return (
//     <div>
//       <div className="flex justify-center">
//         <MapContainer
//           center={[-38.000, -57.550]}
//           zoom={12.4}
//           style={{ width: "70%", height: "600px" }}
//           zoomControl={false}
//         >
//           <ZoomControl position="topright" />
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//           {/* Marcadores de veterinarias */}
//           {veterinarias.map((vet, index) => (
//             <Marker key={index} position={[vet.lat, vet.lon]} icon={vetIcon}>
//               <Popup>🏥 {vet.nombre}</Popup>
//             </Marker>
//           ))}

//           {/* Marcador del usuario */}
//           <Marker position={userPosition} icon={userIcon}>
//             <Popup>
//               📍 Usted está aquí <br />
//               Lat: {userPosition[0]} | Lon: {userPosition[1]}
//             </Popup>
//           </Marker>
//         </MapContainer>

//         <div className="m-8">
//           <Formulario onUbicacionSeleccionada={actualizarUbicacionUsuario} />

//           {/* Mostrar la veterinaria más cercana */}
//           {nearestVet && (
//             <div style={{ marginTop: "1rem", background: "#f8f8f8", padding: "1rem" }}>
//               <h3>Veterinaria más cercana:</h3>
//               <p><strong>{nearestVet.nombre}</strong></p>
//               <p>Distancia: {nearestVet.distance.toFixed(2)} km</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Map;

