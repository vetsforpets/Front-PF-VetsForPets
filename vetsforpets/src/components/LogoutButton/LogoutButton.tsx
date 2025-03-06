"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import LogoutModal from "../LogoutModal/LogoutModal";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const { clearUserData, userData } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogout = () => {
    clearUserData();
    console.log("Sesión cerrada con éxito");
    router.push("/login");

    toast.success("Sesión cerrada con éxito", {
      style: {
        color: "#0c5460",
        background: "#d1ecf1",
        borderRadius: "8px",
        padding: "16px",
        border: "1px solid #bee5eb",
      },
      duration: 3000,
    });
  };

  if (!userData) return null;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full customButton"
      >
        Cerrar Sesión
      </button>

      <LogoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}