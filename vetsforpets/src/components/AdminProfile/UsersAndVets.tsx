"use client";
import React, { useState, useEffect } from "react";
import { fetchUsers } from "@/services/servicesUser";
import { getAllVets } from "@/services/servicesVet";
import { useUserStore } from "@/store";
import { IUserApiResponse } from "@/services/interfaces";
import { IVetFormData } from "@/interfaces/registerTypes";
import DonutUsersVets from "./DonutsUsersVets";

const UserAndVets = () => {
  const { userData } = useUserStore();

  const [allUsers, setAllUsers] = useState<IUserApiResponse[]>([]);
  const [allVets, setAllVets] = useState<IVetFormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalUsers = allUsers.length;
  const totalVets = allVets.length;

  useEffect(() => {
    if (!userData?.token) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [usersData, vetsData] = await Promise.all([
          fetchUsers(userData.token),
          getAllVets(userData.token),
        ]);

        setAllUsers(usersData);
        setAllVets(vetsData);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError("Ocurrió un error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData?.token]);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p className="text-red-600">⚠️ {error}</p>;
  }

  return (

    <div className="flex justify-center mt-8"> 
      <DonutUsersVets totalUsers={totalUsers} totalVets={totalVets} />
    </div>
  
  );
};

export default UserAndVets;
