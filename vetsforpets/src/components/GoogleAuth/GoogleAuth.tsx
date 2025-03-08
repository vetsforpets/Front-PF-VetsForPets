"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUserData, loginUserWithGoogle } from "@/services/servicesUser";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

export function GoogleAuth() {
  const { setUserData } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        toast.error("Código de autenticación no encontrado");
        router.push("/login");
        return;
      }

      try {
        const data = await loginUserWithGoogle(code);

        if (data && data.token) {
          const decodedToken = jwtDecode(data.token);

          if (decodedToken.sub) {
            const user = await fetchUserData(decodedToken.sub, data.token);

            const userData = {
              token: data.token,
              id: user.id,
              role: user.role,
              email: user.email,
            };

            setUserData(userData);

            toast.success("¡Inicio de sesión con Google exitoso!", {
              duration: 3000,
            });
            router.push("/");
          }
        } else {
          toast.error("Error al iniciar sesión con Google");
          router.push("/login");
        }
      } catch (error) {
        console.error("❌ Error en login con Google:", error);
        toast.error("Error al iniciar sesión con Google");
        router.push("/login");
      }
    };

    handleGoogleAuth();
  }, [router, setUserData]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg font-semibold">Procesando autenticación...</p>
    </div>
  );
}
