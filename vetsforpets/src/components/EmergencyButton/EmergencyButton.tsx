import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { updatePetshop, getVetById } from "@/services/servicesVet";
import { fetchUserData, updateUser } from "@/services/servicesUser";
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
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  // const [userEmergencies, setUserEmergencies] = useState<
  //   { vetId: string; chatId: string }[]
  // >([]);
  const socketRef = useRef<Socket | null>(null);

  // Obtener la información del usuario y verificar si es premium
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userData?.id && userData?.token) {
        try {
          const user = await fetchUserData(userData.id, userData.token);
          setIsPremium(user.isPremium ?? false);
          setPets(user.pets || []);
          // setUserEmergencies(user.emergencies || []); // Obtener emergencias activas del usuario
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      }
    };
    fetchUserInfo();
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

    // Obtener los datos actuales del usuario
    const user = await fetchUserData(userData.id, userData.token);
    if (!user) {
      setError("No se encontraron los datos del usuario.");
      return;
    }

    // Obtener los datos actuales de la veterinaria
    const petshopData = await getVetById(petshopId, userData.token);
    if (!petshopData) {
      setError("No se encontró la veterinaria.");
      return;
    }

    if (user.emergencies) {
      const hasExistingEmergencyWithVet = user.emergencies.some(
        (emergency) => emergency.vetId === petshopId
      );

      if (hasExistingEmergencyWithVet) {
        toast.error("Ya tienes una emergencia activa con esta veterinaria.", {
          duration: 3000,
          style: {
            color: "#721c24",
            background: "#f8d7da",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #f5c6cb",
          },
        });
        return;
      }
    }

    // Verificar el límite de emergencias
    if ((user.emergencies?.length || 0) >= 3) {
      toast.error("No puedes tener más de 3 emergencias activas.", {
        duration: 3000,
        style: {
          color: "#721c24",
          background: "#f8d7da",
          borderRadius: "8px",
          padding: "16px",
          border: "1px solid #f5c6cb",
        },
      });
      return;
    }

    if ((petshopData.emergencies?.length || 0) >= 3) {
      toast.error("Esta veterinaria ya tiene demasiadas emergencias activas.", {
        duration: 3000,
        style: {
          color: "#721c24",
          background: "#f8d7da",
          borderRadius: "8px",
          padding: "16px",
          border: "1px solid #f5c6cb",
        },
      });
      return;
    }

    setLoading(true);

    try {
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
      petshopData.licenseNumber = 12345;

      // Agregar la emergencia al usuario
      const updatedUserData = {
        ...user,

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

      toast.success(
        "Emergencia solicitada con éxito. Desliza abajo para abrir el chat",
        {
          duration: 5000,
          style: {
            color: "#155724",
            background: "#d4edda",
            borderRadius: "8px",
            padding: "16px",
            border: "1px solid #c3e6cb",
          },
        }
      );

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
        disabled={loading || isPremium === false}
        className={`px-4 py-2 text-white rounded-md shadow-md ${
          isPremium
            ? "bg-red-500 hover:bg-red-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {loading ? "Solicitando..." : "Solicitar Emergencia"}
      </button>

      {isPremium === false && (
        <p className="mt-2 text-sm text-red-600">
          ❌ Los usuarios no premium no pueden solicitar emergencias.
        </p>
      )}

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
              disabled={!selectedPet || !chatId}
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
