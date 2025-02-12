"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import { toast } from "sonner";

export function LogoutButton() {
  const router = useRouter();
  const { clearUserData, userData } = useUserStore();

  const handleLogout = () => {
    clearUserData();
    toast.success("Sesión cerrada exitosamente", {
      duration: 3000,
      style: {
        color: "#155724",
        background: "#d4edda",
        borderRadius: "8px",
        padding: "16px",
        border: "1px solid #c3e6cb",
      },
    });
    router.push("/login");
  };

  if (!userData) return null;

  return (
    <button onClick={handleLogout} className="customButtonDos">
      Cerrar Sesión
    </button>
  );
}
