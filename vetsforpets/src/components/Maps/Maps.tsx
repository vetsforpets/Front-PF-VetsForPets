"use client";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useState, useEffect, useMemo } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import Formulario from "./Form";
import RoutingControl from "./RoutingControl";
import { fetchUserData, fetchUsers } from "@/services/servicesUser";
import { getAllVets } from "@/services/servicesVet"; 
import { useUserStore } from "@/store";
import RecenterAutomatically from "./RecenterAutomatically";
import Image from "next/image";
import { getVetById } from "@/services/servicesVet";
import { RequestEmergencyButton } from "../EmergencyButton/EmergencyButton";
import { IUserApiResponse } from "@/services/interfaces";
import { IVetFormData } from "@/interfaces/registerTypes";

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
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [allUsers, setAllUsers] = useState<IUserApiResponse[]>([]);
  const [allVets, setAllVets] = useState<IVetFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser] = useState<IUserApiResponse | null>(null);


  const [selectedEntity, setSelectedEntity] = useState<{
    type: 'USER' | 'VET' | null;
    data: IUserApiResponse | Vet | IVetFormData | null;
  }>({type: null, data: null});
  

  useEffect(() => {
    const fetchAllUsersAndVets = async () => {
      if (!userData?.token) return;

      setLoading(true);
      try {
        const [usersData, vetsData] = await Promise.all([
          fetchUsers(userData.token),
          getAllVets(userData.token),
        ]);

        console.log("Usuarios obtenidos:", usersData);
      console.log("Veterinarias obtenidas:", vetsData);

        setAllUsers(usersData);
        setAllVets(vetsData);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError("Hubo un problema al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsersAndVets();
  }, [userData?.token]); 


  useEffect(() => {
    console.log("Datos del usuario desde zustand:", userData);
  }, [userData]);

  useEffect(() => {
    const getUserLocation = async () => {
      if (!userData?.id || !userData?.token) return;
  
      try {
        if (userData.role === "PETSHOP") {
          const vetResponse = await getVetById(userData.id, userData.token);
          if (vetResponse && Array.isArray(vetResponse.location) && vetResponse.location.length > 0) {
            const lat = vetResponse.location[0].latitude;
            const lon = vetResponse.location[0].longitude;
            if (lat !== undefined && lon !== undefined) {
              setUserPosition([lat, lon]);
            }
          }
        } else {
          const userResponse = await fetchUserData(userData.id, userData.token);
          if (userResponse?.location?.length > 0) {
            const lat = userResponse.location[0].latitude;
            const lon = userResponse.location[0].longitude;
            if (lat !== undefined && lon !== undefined) {
              setUserPosition([lat, lon]);
            }
          }
          // Aquí se guarda el valor admin del usuario
          if (userResponse?.isAdmin !== undefined) {
            setIsAdmin(userResponse.isAdmin);
            console.log("Es Admin", userResponse.isAdmin)
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
      {loading && <p>Cargando datos...</p>}
{error && <p className="error">{error}</p>}

     
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

          {!isAdmin && (
  loadingVets ? (
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
  )
)}
          {userPosition && (
            <Marker position={userPosition} icon={userIcon}>
              <Popup>
                📍 Usted está aquí <br />
                Lat: {userPosition[0]} | Lon: {userPosition[1]}
              </Popup>
            </Marker>
          )}

          {userPosition && destinationVet && userData?.role === "USER" && !isAdmin &&(
            <RoutingControl origin={userPosition} destination={[destinationVet.lat, destinationVet.lon]} />
          )}




{isAdmin && (
  <>
    {allUsers.map((user) => (
      Array.isArray(user.location) && user.location.length > 0 && (
        <Marker
          key={user.id}
          position={[
            parseFloat(user.location[0].latitude.toString()),
            parseFloat(user.location[0].longitude.toString()),
          ]}
          icon={userIcon}
          eventHandlers={{
            click: () => setSelectedEntity({ type: 'USER', data: user })
          }}
        >
          <Popup>
            <strong>👤 Usuario:</strong> {user.name}<br />
            Lat: {user.location[0].latitude} | Lon: {user.location[0].longitude}
          </Popup>
        </Marker>
      )
    ))}

{allVets.map((vet) => (
  Array.isArray(vet.location) && vet.location.length > 0 && (
    <Marker
      key={vet.id}
      position={[
        parseFloat(vet.location[0].latitude.toString()),
        parseFloat(vet.location[0].longitude.toString())
      ]}
      icon={vetIcon}
      eventHandlers={{
        click: () => setSelectedEntity({ type: 'VET', data: vet })
      }}
    >
      <Popup>
        <strong>🏥 Clínica:</strong> {vet.name}<br />
        <strong>👩‍⚕️ Veterinario/a:</strong> {vet.veterinarian || "No especificado"}
      </Popup>
    </Marker>
  )
))}

  </>
)}

          
        </MapContainer>

        <div className="m-8">
        {!isAdmin && <Formulario onUbicacionSeleccionada={actualizarUbicacionUsuario} />}

  {selectedEntity.type === "USER" && selectedEntity.data && (
  <div className="customInput">
    <Image
      src={(selectedEntity.data as IUserApiResponse).imgProfile}
      alt={`Imagen de ${(selectedEntity.data as IUserApiResponse)}`}
      width={50}
      height={50}
      className="object-cover w-32 h-32 mx-auto mb-4"
    />
    <h3 className="m-3 text-lg">👤 Usuario: {(selectedEntity.data as IUserApiResponse).name} {(selectedEntity.data as IUserApiResponse).lastName}</h3>
    <h3 className="m-3 text-lg"> Edad: {(selectedEntity.data as IUserApiResponse).age}</h3>
    <h3 className="m-3 text-lg"> Email: {(selectedEntity.data as IUserApiResponse).email}</h3>
    <h3 className="m-3 text-lg"> Numero de Contacto: {(selectedEntity.data as IUserApiResponse).phoneNumber}</h3>
    <p className="m-3 text-lg">
      📍 Ubicación: Lat {(selectedEntity.data as IUserApiResponse).location?.[0]?.latitude} | Lon {(selectedEntity.data as IUserApiResponse).location?.[0].longitude}
    </p>
  </div>
)}

{selectedEntity.type === "VET" && selectedEntity.data && (
  <div className="customInput">
    <h3 className="m-3 text-lg">🏥 Veterinaria: {(selectedEntity.data as Vet).nombre}</h3>
    <Image
      src={(selectedEntity.data as Vet).imgProfile}
      alt={`Imagen de ${(selectedEntity.data as Vet).nombre}`}
      width={50}
      height={50}
      className="object-cover w-32 h-32 mx-auto mb-4"
    />
    <p className="m-3 text-lg">👩‍⚕️ Veterinario/a: {(selectedEntity.data as Vet).veterinarian}</p>
    <p className="m-3 text-lg">📞 Teléfono: {(selectedEntity.data as Vet).nroDeTelefono}</p>
    <p className="m-3 text-lg">
      📍 Ubicación: Lat {(selectedEntity.data as Vet).lat} | Lon {(selectedEntity.data as Vet).lon}
    </p>
  </div>
)}





  {destinationVet && !selectedUser && !isAdmin && (
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
          ).toFixed(2)} km
        </p>
      )}
      {!isAdmin && <RequestEmergencyButton petshopId={destinationVet.id} />}
    </div>
  )}
</div>
      </div>
     
    </div>
  );
};

export default Maps;
