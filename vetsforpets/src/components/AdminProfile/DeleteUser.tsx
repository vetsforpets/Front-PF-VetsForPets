"use client"

import React, { useState, useEffect } from "react";
import { deleteUser, fetchUsers, fetchUserData } from "@/services/servicesUser"; 
import { toast } from "sonner";
import { useUserStore } from "@/store";

interface User {
  id: string;
  name: string;
  lastName?: string;
  isActive?: boolean;
  imgProfile?: string;
  email?: string;
  phoneNumber?: string;
}

const DeleteUser = () => {
  const { userData } = useUserStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const token = userData?.token;

  useEffect(() => {
    if (!token) {
      toast.error("No se ha encontrado un token válido");
      setLoading(false);
      return;
    }

    const fetchUserList = async () => {
      try {
        const allUsers = await fetchUsers(token);
        const detailedUsers = await Promise.all(
          allUsers.map(async (user: User) => {
            try {
              const detailedUser = await fetchUserData(user.id, token);
              return detailedUser;
            } catch (error) {
              console.error(`Error al obtener detalles de ${user.name}`, error);
              return null;
            }
          })
        );

        const activeUsers = detailedUsers.filter(
          (user) => user && user.isActive
        ) as User[];
        setUsers(activeUsers);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        toast.error("Error al obtener los usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!token) {
      toast.error("No se ha encontrado un token válido para eliminar");
      return;
    }

    const confirmed = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
    if (confirmed) {
      try {
        const response = await deleteUser(id, token);
        if (response.error) {
          toast.error("No se pudo eliminar el usuario");
        } else {
          toast.success("Usuario eliminado con éxito");
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        }
      } catch {
        toast.error("Error al eliminar el usuario");
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Lista de Usuarios Activos</h2>

      {users.length === 0 ? (
        <p>No hay usuarios activos registrados.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-lg bg-[#f1bd81]"
            >
              <p className="text-black">
                <strong>{user.name} {user.lastName}</strong>
              </p>
              <button
                className="px-4 py-2 text-white bg-red-800 rounded"
                onClick={() => handleDelete(user.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteUser;

