import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { updatePetshop, getVetById } from "@/services/servicesVet";
import { fetchUserData, updateUser } from "@/services/servicesUser"; // Se importan los servicios
import { useUserStore } from "@/store";
import { Pet } from "../pet/PetPreview";
import { toast } from "sonner";

interface RequestEmergencyButtonProps {
  petshopId: string;
}

export const RequestEmergencyButton: React.FC<RequestEmergencyButtonProps> = ({
  petshopId,
}) => {
  const { userData } = useUserStore();
  const token = userData?.token;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // Obtener las mascotas del usuario
  useEffect(() => {
    const fetchPets = async () => {
      if (userData?.id && userData?.token) {
        try {
          const data = await fetchUserData(userData.id, userData.token);
          setPets(data.pets || []);
        } catch (error) {
          console.error("Error al obtener mascotas del usuario:", error);
        }
      }
    };
    fetchPets();
  }, [userData?.id, userData?.token]);

  // Conectarse al WebSocket y manejar eventos
  useEffect(() => {
    if (!userData?.token) return;

    const socket = io("wss://vetsforpets-api.onrender.com", {
      path: "/socket.io/",
      transports: ["websocket"],
      auth: { token },
    });

    socketRef.current = socket;

    const handleJoinedRoom = (roomId: string) => {
      console.log("🟢 Sala de chat asignada:", roomId);
      setChatId(roomId);
    };

    socket.on("joinedRoom", handleJoinedRoom);

    return () => {
      socket.off("joinedRoom", handleJoinedRoom);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userData?.token]);

  useEffect(() => {
    console.log("📌 Estado actual de chatId:", chatId);
  }, [chatId]);

  // 📌 Ahora `joinRoom` se ejecuta cuando se abre el modal
  const handleOpenModal = () => {
    setShowModal(true);
    setError(null);

    if (socketRef.current) {
      console.log("🟢 Enviando `joinRoom` al abrir el modal...");
      socketRef.current.emit("joinRoom", petshopId);
    }
  };

  const handleRequestEmergency = async () => {
    if (!userData?.id || !userData?.token || !selectedPet) {
      setError("Debe seleccionar una mascota.");
      return;
    }

    if (!chatId) {
      setError("Error: No se pudo obtener el chatId.");
      return;
    }

    console.log(
      "🚨 Solicitando emergencia a la veterinaria con ID:",
      petshopId
    );
    setLoading(true);

    try {
      // Obtener los datos actuales de la veterinaria
      const petshopData = await getVetById(petshopId, userData.token);
      if (!petshopData) {
        throw new Error("No se encontró la veterinaria.");
      }

      // Obtener los datos actuales del usuario
      const user = await fetchUserData(userData.id, userData.token);
      if (!user) {
        throw new Error("No se encontraron los datos del usuario.");
      }

      if (typeof petshopData.licenseNumber === "string") {
        petshopData.licenseNumber = Number(petshopData.licenseNumber);
      }

      // Nueva emergencia a agregar
      const newVetEmergency = {
        userId: userData.id,
        pet: selectedPet,
        chatId,
      };

      const newUserEmergency = {
        vetId: petshopId,
        pet: selectedPet,
        chatId,
      };

      // Agregar la emergencia a la veterinaria
      petshopData.emergencies = [
        ...(petshopData.emergencies || []),
        newVetEmergency,
      ];

      // Agregar la emergencia al usuario
      const updatedUserData = {
        ...user, // Se mantiene el resto de los datos del usuario
        emergencies: [...(user.emergencies || []), newUserEmergency],
      };

      console.log("Emergencia a agregar:", updatedUserData);

      // Actualizar veterinaria y usuario en paralelo
      await Promise.all([
        updatePetshop(petshopId, petshopData, userData.token),
        updateUser(userData.id, updatedUserData, userData.token),
      ]);

      const updatedUser = await fetchUserData(userData.id, userData.token);
      console.log("✅ Usuario actualizado:", updatedUser);

      toast.success("Emergencia solicitada con éxito.", {
        duration: 3000,
        style: {
          color: "#155724",
          background: "#d4edda",
          borderRadius: "8px",
          padding: "16px",
          border: "1px solid #c3e6cb",
        },
      });

      setShowModal(false);
    } catch (err) {
      console.error("Error al solicitar emergencia:", err);
      setError("Hubo un problema al solicitar la emergencia.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleOpenModal}
        disabled={loading}
        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-700 disabled:bg-gray-400 blink"
      >
        {loading ? "Solicitando..." : "Solicitar Emergencia"}
      </button>

      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-2 text-xl font-bold">Selecciona una mascota</h2>
            <ul className="mb-4">
              {pets.length > 0 ? (
                pets.map((pet) => (
                  <li
                    key={pet.id}
                    onClick={() => setSelectedPet(pet)}
                    className={`cursor-pointer p-2 rounded-md ${
                      selectedPet?.id === pet.id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {pet.name}
                  </li>
                ))
              ) : (
                <p>No tienes mascotas registradas.</p>
              )}
            </ul>
            <button
              onClick={handleRequestEmergency}
              className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-700"
              disabled={!selectedPet || !chatId} // Se deshabilita hasta que el chatId esté listo
            >
              Confirmar Emergencia
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full px-4 py-2 mt-2 text-white bg-red-500 rounded-md hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};
