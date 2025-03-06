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
import { getAllVets } from "@/services/servicesVet"; 
import { useUserStore } from "@/store";
import RecenterAutomatically from "./RecenterAutomatically";
import Image from "next/image";
import { getVetById } from "@/services/servicesVet";
import { RequestEmergencyButton } from "../EmergencyButton/EmergencyButton";

interface Vet {
  id: string,
  lat: number;
  lon: number;
  imgProfile: string;
  nombre: string;
  nroDeTelefono: string;
  veterinarian: string;
}

interface VetWithDistance extends Vet {
  distance: number;
}

interface LeafletHTMLElement extends HTMLElement {
  _leaflet_id?: number;
}

const Maps = () => {
  const { userData } = useUserStore();
  const [userPosition, setUserPosition] = useState<[number, number]>([-37.99, -57.55]);
  const [veterinarias, setVeterinarias] = useState<Vet[]>([]);
  const [nearestVet, setNearestVet] = useState<VetWithDistance | null>(null);
  const [selectedVet, setSelectedVet] = useState<Vet | null>(null);
  const [loadingVets, setLoadingVets] = useState(true);
  const [errorVets, setErrorVets] = useState<string | null>(null);


  useEffect(() => {
    console.log("Datos del usuario desde zustand:", userData);
  }, [userData]);

  useEffect(() => {
    const getUserLocation = async () => {
      if (!userData?.id || !userData?.token) return;
  
      try {
        if (userData.role === "PETSHOP") {
          
          // Para veterinarias: se obtiene la ubicación usando getVetById
          console.log("Obteniendo datos de la vet...");
          const vetResponse = await getVetById(userData.id, userData.token);
          console.log("Datos obtenidos (vet):", vetResponse);
          if (vetResponse && Array.isArray(vetResponse.location) && vetResponse.location.length > 0) {
            const lat = vetResponse.location[0].latitude;
            const lon = vetResponse.location[0].longitude;
            if (lat !== undefined && lon !== undefined) {
              setUserPosition([lat, lon]);
              console.log("Ubicación de la vet establecida:", [lat, lon]);
            } else {
              console.warn("La ubicación de la vet es undefined.");
            }
          } else {
            console.warn("No se encontró ubicación para la vet.");
          }
        } else {
          
          // Para usuarios: se obtiene la ubicación usando fetchUserData
          console.log("Obteniendo datos del usuario...");
          const userResponse = await fetchUserData(userData.id, userData.token);
          console.log("Datos obtenidos (user):", userResponse);
          if (userResponse?.location?.length > 0) {
            const lat = userResponse.location[0].latitude;
            const lon = userResponse.location[0].longitude;
            if (lat !== undefined && lon !== undefined) {
              setUserPosition([lat, lon]);
              console.log("Ubicación del usuario establecida:", [lat, lon]);
            } else {
              console.warn("La ubicación del usuario es undefined.");
            }
          } else {
            console.warn("No se encontró ubicación para el usuario.");
          }
        }
      } catch (error) {
        console.error("Error al obtener ubicación:", error);
      }
    };
  
    getUserLocation();
  }, [userData?.id, userData?.token, userData?.role]);
  
  
  // Obtener veterinarias
  useEffect(() => {
    const fetchVets = async () => {
      if (!userData?.token) {
        return;
      }
      try {
        setLoadingVets(true);
        setErrorVets(null);
        const vetData = await getAllVets(userData.token);
        console.log("Veterinarias obtenidas:", vetData);
  
        if (vetData && Array.isArray(vetData)) {
          const filteredVets = vetData
            .map((vet) => {
              if (vet.location && vet.location.length > 0) {
                return {
                  id: vet.id,
                  lat: parseFloat(vet.location[0].latitude),
                  lon: parseFloat(vet.location[0].longitude),
                  imgProfile: vet.imgProfile || "",
                  nombre: vet.name || "Veterinaria sin nombre",
                  nroDeTelefono: vet.phoneNumber || "No disponible",
                  veterinarian: vet.veterinarian ? vet.veterinarian : "Veterinario no especificado",
                };
              }
              return null;
            })
            .filter((vet): vet is Vet => vet !== null);
  
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

  // Calcular la veterinaria más cercana
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

  // Usar useMemo para evitar recrear los iconos en cada render
  const vetIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "/google-maps.svg",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      }),
    []
  );

  const userIcon = useMemo(
    () =>
      new L.Icon({
        iconUrl: "/street-viewUser.svg",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      }),
    []
  );

  const handleVetClick = (vet: Vet) => {
    setSelectedVet(vet);
  };

  const destinationVet = selectedVet || nearestVet;

  // Efecto para limpiar el contenedor del mapa al desmontar el componente
  useEffect(() => {
    return () => {
      const container = document.getElementById("map-container") as LeafletHTMLElement | null;
      // Si existe y tiene _leaflet_id, lo eliminamos para evitar la inicialización duplicada
      if (container && container._leaflet_id) {
        container._leaflet_id = undefined;
      }
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center">
     
        <MapContainer
          id="map-container"
          // key={userPosition.join(",")}
          center={userPosition || [-38.0, -57.55]}
          zoom={12.4}
          style={{ width: "70%", height: "600px" }}
          zoomControl={false}
        >
          <RecenterAutomatically lat={userPosition[0]} lng={userPosition[1]} />
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
                  <Image
                    src={vet.imgProfile}
                    alt={`Imagen de ${vet.nombre}`}
                    width={50}  
                    height={50}
                    className="object-cover w-32 h-32 mx-auto mt-3 mb-3"
                  />
                  <strong>👩‍⚕️ Veterinario/a:</strong>{" "}
                  {vet.veterinarian || "Veterinario no especificado"} <br />
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

          {userPosition && destinationVet && userData?.role === "USER" && (
            <RoutingControl origin={userPosition} destination={[destinationVet.lat, destinationVet.lon]} />
          )}
        </MapContainer>

        <div className="m-8">
          <Formulario onUbicacionSeleccionada={actualizarUbicacionUsuario} />
          {destinationVet && (
            <div className="customInput">
              
              <h3 className="m-3 text-lg">Ruta hacia: {destinationVet.nombre}</h3>
              <Image
                src={destinationVet.imgProfile}
                alt={`Imagen de ${destinationVet.nombre}`}
                width={50}  
                height={50}
                className="object-cover w-32 h-32 mx-auto mb-4"
              />
              <p className="m-3 text-lg">👩‍⚕️ Veterinario/a: {destinationVet.veterinarian}</p>
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
              
              {/* <button>
                <Image
                  src="pulse-3 (1).svg"
                  alt="Botón de Emergencia"
                  width={50}
                  height={50}
                  className="object-contain cursor-pointer"
                />
</button> */}

                <RequestEmergencyButton petshopId={destinationVet.id}/>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Maps;

