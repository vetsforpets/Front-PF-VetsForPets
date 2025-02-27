"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const { clearUserData, userData } = useUserStore();

  const handleLogout = () => {
    const confirmed = window.confirm("¿Está seguro que desea cerrar sesión?");

    if (confirmed) {
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
    } else {
      console.log("Cancelado");
    }
  };

  if (!userData) return null;

  return (
    <button onClick={handleLogout} className="customButton w-full">
      Cerrar Sesión
    </button>
  );
}
