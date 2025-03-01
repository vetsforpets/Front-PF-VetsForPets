"use client";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import Formulario from "./Form";
import RoutingControl from "./RoutingControl";
import { fetchUserData } from "@/services/servicesUser";
import { getAllVets } from "@/services/servicesVet"; // Importamos el servicio para obtener veterinarias
import { useUserStore } from "@/store";

interface Vet {
  lat: number;
  lon: number;
  nombre: string;
  nroDeTelefono: string;
  veterinarian: string
}

interface VetWithDistance extends Vet {
  distance: number;
}

const Map = () => {
  const { userData } = useUserStore();
  const [userPosition, setUserPosition] = useState<[number, number]>([-37.9900, -57.5500]);
  const [veterinarias, setVeterinarias] = useState<Vet[]>([]);
  const [nearestVet, setNearestVet] = useState<VetWithDistance | null>(null);
  const [selectedVet, setSelectedVet] = useState<Vet | null>(null);
  const [loadingVets, setLoadingVets] = useState(true);
  const [errorVets, setErrorVets] = useState<string | null>(null);

  useEffect(() => {
    const getUserLocation = async () => {
      if (!userData?.id || !userData?.token) return;
      try {
        console.log("Obteniendo datos del usuario...");
        const userResponse = await fetchUserData(userData.id, userData.token);
        console.log("Datos obtenidos de fetchUserData:", userResponse);
  
        if (userResponse?.location?.length > 0) {
          const lat = userResponse.location[0].latitude;
          const lon = userResponse.location[0].longitude;
  
          if (lat !== undefined && lon !== undefined) {
            setUserPosition([lat, lon]);
            console.log("Ubicación establecida:", [lat, lon]);
          } else {
            console.warn("Ubicación del usuario es undefined.");
          }
        } else {
          console.warn("No se encontró ubicación para el usuario.");
        }
      } catch (error) {
        console.error("Error al obtener la ubicación del usuario:", error);
      }
    };
  
    getUserLocation();
  }, [userData?.id, userData?.token]);
  

  // Obtener las veterinarias reales del backend
  useEffect(() => {
    const fetchVets = async () => {
      if (!userData?.token) {
        console.warn("No hay token disponible para obtener veterinarias.");
        return;
      }
      try {
        setLoadingVets(true);
        setErrorVets(null);
  
        console.log("Obteniendo veterinarias...");
        const vetData = await getAllVets(userData.token);
        console.log("Veterinarias obtenidas:", vetData);
  
        if (vetData && Array.isArray(vetData)) {
          const filteredVets = vetData
            .map((vet) => {
              
              if (vet.location && vet.location.length > 0) {
                return {
                  lat: parseFloat(vet.location[0].latitude),
        lon: parseFloat(vet.location[0].longitude),
        nombre: vet.name || "Veterinaria sin nombre",
        nroDeTelefono: vet.phoneNumber || "No disponible",
        veterinarian: vet.veterinarian ? vet.veterinarian : "Veterinario no especificado",
                };
              }
              return null; 
            })
            .filter(vet => vet !== null);
  
          if (filteredVets.length === 0) {
            setErrorVets("No se encontraron veterinarias con ubicaciones válidas.");
          }
  
          setVeterinarias(filteredVets);
        } else {
          setErrorVets("No se encontraron veterinarias.");
        }
      } catch (error) {
        console.error("Error al obtener veterinarias:", error);
        setErrorVets("Error al cargar las veterinarias.");
      } finally {
        setLoadingVets(false);
      }
    };
  
    fetchVets();
  }, [userData?.token]);
  
  
  const actualizarUbicacionUsuario = (lat: number, lon: number) => {
    console.log("Nueva ubicación del usuario:", lat, lon);
    setUserPosition([lat, lon]);
    setSelectedVet(null);
  };

  useEffect(() => {
    if (!userPosition || veterinarias.length === 0) return;

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
    setSelectedVet(vet);
  };

  const destinationVet = selectedVet || nearestVet;

  return (
    <div>
      <div className="flex justify-center">
        <MapContainer
          center={userPosition || [-38.000, -57.550]}
          zoom={12.4}
          style={{ width: "70%", height: "600px" }}
          zoomControl={false}
        >
          <ZoomControl position="topright" />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {loadingVets ? (
            <p className="text-lg text-center">Cargando veterinarias...</p>
          ) : errorVets ? (
            <p className="text-center text-red-600">⚠️ {errorVets}</p>
          ) : (
            veterinarias.map((vet, index) => (
              <Marker
                key={index}
                position={[vet.lat, vet.lon]}
                icon={vetIcon}
                eventHandlers={{ click: () => handleVetClick(vet) }}
              >
                <Popup>
  <strong>🏥 Clínica:</strong> {vet.nombre} <br />
  <strong>👩‍⚕️ Veterinario/a:</strong> {vet.veterinarian || "Veterinario no especificado"} <br />
  <strong>📞 Teléfono:</strong> {vet.nroDeTelefono}
</Popup>

              </Marker>
            ))
          )}

          {userPosition && (
            <Marker position={userPosition} icon={userIcon}>
              <Popup>
                📍 Usted está aquí <br />
                Lat: {userPosition[0]} | Lon: {userPosition[1]}
              </Popup>
            </Marker>
          )}

          {userPosition && destinationVet && (
            <RoutingControl origin={userPosition} destination={[destinationVet.lat, destinationVet.lon]} />
          )}
        </MapContainer>

        <div className="m-8">
          <Formulario onUbicacionSeleccionada={actualizarUbicacionUsuario} />
          {destinationVet && (
            <div className="customInput">
              <h3 className="m-3 text-lg">Ruta hacia: {destinationVet.nombre}</h3>
              <p className="m-3 text-lg">📞 Veterinario/a: {destinationVet.veterinarian}</p>
              <p className="m-3 text-lg">📞 Teléfono: {destinationVet.nroDeTelefono}</p>
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
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import { useState, useEffect, useMemo } from "react";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import Formulario from "./Form";
// import RoutingControl from "./RoutingControl";
// import { fetchUserData } from "@/services/servicesUser"; 
// import { useUserStore } from "@/store";


// interface Vet {
//   lat: number;
//   lon: number;
//   nombre: string;
//   nroDeTelefono: string
// }

// interface VetWithDistance extends Vet {
//   distance: number;
// }

// const Map = () => {
//   const { userData } = useUserStore();
//   const [userPosition, setUserPosition] = useState<[number, number]>([-37.9900, -57.5500]);
  
//   const [nearestVet, setNearestVet] = useState<VetWithDistance | null>(null);
 
//   const [selectedVet, setSelectedVet] = useState<Vet | null>(null);

 
//   const veterinarias: Vet[] = useMemo(() => [
//     { lat: -38.002, lon: -57.543, nombre: "Veterinaria Patitas", nroDeTelefono: "0223-1234567" },
//     { lat: -38.000, lon: -57.555, nombre: "VetCare Mar del Plata", nroDeTelefono: "0223-2345678" },
//     { lat: -37.995, lon: -57.560, nombre: "Clínica Veterinaria Alfredo", nroDeTelefono: "0223-3456789" },
//     { lat: -38.008, lon: -57.540, nombre: "Veterinaria Layus", nroDeTelefono: "0223-4567890" },
//     { lat: -38.003, lon: -57.555, nombre: "Mundo Animal Vet", nroDeTelefono: "0223-5678901" }
//   ], []);


//   useEffect(() => {
//     const getUserLocation = async () => {
//       if (!userData?.id || !userData?.token) return;
//       try {
//         console.log("Obteniendo datos del usuario...");
//         const userResponse = await fetchUserData(userData.id, userData.token);
//         console.log("Datos obtenidos de fetchUserData:", userResponse);

//         if (userResponse?.location?.length > 0) {
//           setUserPosition([
//             userResponse.location[0].latitude,
//             userResponse.location[0].longitude,
//           ]);
//           console.log("Ubicación establecida:", [
//             userResponse.location[0].latitude,
//             userResponse.location[0].longitude,
//           ]);
//         } else {
//           console.warn("No se encontró ubicación para el usuario.");
          
//         }
//       } catch (error) {
//         console.error("Error al obtener la ubicación del usuario:", error);
        
//       }
//     };

//     getUserLocation();
//   }, [userData?.id, userData?.token]);


  
  
//   const actualizarUbicacionUsuario = (lat: number, lon: number) => {
//     console.log("Nueva ubicación del usuario:", lat, lon);
//     setUserPosition([lat, lon]);
    
//     setSelectedVet(null);
//   };

//   // Calcular la veterinaria más cercana cada vez que userPosition cambie
//   useEffect(() => {
//     if (!userPosition) return;
//     let minDistance = Infinity;
//     let nearest: VetWithDistance | null = null;
    
//     const userLatLng = L.latLng(userPosition[0], userPosition[1]);
//     for (const vet of veterinarias) {
//       const vetLatLng = L.latLng(vet.lat, vet.lon);
      
//       const distance = userLatLng.distanceTo(vetLatLng) / 1000;
      
//       if (distance < minDistance) {
//         minDistance = distance;
        
//         nearest = { ...vet, distance };
//       }
//     }
//     setNearestVet(nearest);
//   }, [userPosition, veterinarias]);


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

  
//   const handleVetClick = (vet: Vet) => {
//     console.log("Veterinaria seleccionada:", vet);
//     setSelectedVet(vet);
//   };

//   // Define cuál veterinara usar para la ruta
//   // Si el usuario hace clic en una, se usa esa si no, se usa la más cercana.
//   const destinationVet = selectedVet || nearestVet;

//   return (
//     <div>
//       <div className="flex justify-center">
//         <MapContainer center={[-38.000, -57.550]} zoom={12.4} style={{ width: "70%", height: "600px" }} zoomControl={false}>
//           <ZoomControl position="topright" />
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

    
//           {veterinarias.map((vet, index) => (
//             <Marker
//               key={index}
//               position={[vet.lat, vet.lon]}
//               icon={vetIcon}
//               eventHandlers={{ click: () => handleVetClick(vet) }}
//             >
//               <Popup>
//                 🏥 {vet.nombre} <br />
//                 📞 {vet.nroDeTelefono}
//               </Popup>
//             </Marker>
//           ))}

          
//           <Marker position={userPosition} icon={userIcon}>
//             <Popup>
//               📍 Usted está aquí <br />
//               Lat: {userPosition[0]} | Lon: {userPosition[1]}
//             </Popup>
//           </Marker>

//           {/* Muestra la ruta entre el usuario y la veterinaria */}
//           {userPosition && destinationVet && (
//             <RoutingControl origin={userPosition} destination={[destinationVet.lat, destinationVet.lon]} />
//           )}
//         </MapContainer>

//         <div className="m-8">
//   <Formulario onUbicacionSeleccionada={actualizarUbicacionUsuario} />
//   {destinationVet && (
//     <div className="customInput">
//       <h3 className="m-3 text-lg">Ruta hacia: {destinationVet.nombre}</h3>
//       <p className="m-3 text-lg">📞 Teléfono: {destinationVet.nroDeTelefono}</p>
//       {/* {nearestVet && destinationVet === nearestVet && (
//         <p>Distancia: {nearestVet.distance.toFixed(2)} km (más cercana)</p>
//       )} */}
//       {userPosition && (
//         <p className="m-3 text-lg">
//           🏥 Distancia:{" "}
//           {(
//             L.latLng(userPosition[0], userPosition[1]).distanceTo(
//               L.latLng(destinationVet.lat, destinationVet.lon)
//             ) / 1000
//           ).toFixed(2)}{" "}
//           km
//         </p>
//       )}
//     </div>
//   )}
// </div>
//       </div>
//     </div>
//   );
// };

// export default Map;
