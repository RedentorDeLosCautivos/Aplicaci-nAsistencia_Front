import { useNavigate } from "react-router-dom";
import { login } from "../../services";
import toast from "react-hot-toast";
import { useState } from "react";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      setIsLoading(true);

      const response = await login({ email, password });
      const userDetails = response.data?.userDetails;

      if (!userDetails?.token) {
        toast.error("Token faltante: No se encontró en la respuesta del servidor.");
        return;
      }

      toast.success("¡Inicio de sesión exitoso!");
      localStorage.setItem("user", JSON.stringify(userDetails));
      navigate("/inicio", { replace: true });

    } catch (error) {
      const errorText = error?.response?.data?.error?.toLowerCase() || "";

      if (errorText.includes("no user")) {
        toast.error("Correo incorrecto: No existe una cuenta asociada a ese correo.");
      } else if (errorText.includes("password")) {
        toast.error("Contraseña incorrecta: Verifica tus credenciales.");
      } else {
        toast.error(`Error de autenticación: ${errorText || "Error al iniciar sesión."}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loginUser,
    isLoading,
  };
};
