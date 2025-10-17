import { useState } from "react";
import toast from "react-hot-toast";
import { registrarAsistencia } from "../../services/api";

export const useAsistencia = () => {
  const [isLoading, setIsLoading] = useState(false);

  const tomarAsistencia = async ({ usuarioId, actividadId }) => {
    if (!usuarioId || !actividadId) {
      toast.error("Faltan datos para registrar la asistencia.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await registrarAsistencia({ usuarioId, actividadId });

      if (response.error) {
        const msg =
          response.e?.response?.data?.message || "Error registrando asistencia.";
        toast.error(msg);
        return null;
      }

      toast.success(response.message || "Asistencia registrada correctamente.");
      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Error al registrar la asistencia.";
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tomarAsistencia,
    isLoading,
  };
};
