"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";

export function LogoutButton() {
    const router = useRouter();
    const { clearUserData, userData } = useUserStore();

    const handleLogout = () => {
        clearUserData();
        router.push("/login");
    };

    if (!userData) return null;

    return (
        <button onClick={handleLogout} className="customButtonDos">
            Cerrar Sesión
        </button>
    );
}
