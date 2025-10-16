import { useState } from "react";
import toast from "react-hot-toast";
import {
  agregarActividad,
  listarActividades,
  eliminarActividad,
  updateActividad,
  actividadById,
  miembrosActividad,
} from "../../services/api";

export const useActividad = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [actividades, setActividades] = useState([]);
  const [actividad, setActividad] = useState(null);
  const [miembros, setMiembros] = useState([]);

  const crearActividad = async (formData) => {
    setIsLoading(true);
    try {
      const response = await agregarActividad(formData);

      if (response.error) {
        toast.error(
          response.e?.response?.data?.message || "Error al registrar la actividad"
        );
        return null;
      }

      toast.success("Actividad registrada correctamente");
      return response.actividad || response.data;
    } catch (error) {
      toast.error(error.message || "Error al registrar la actividad");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const obtenerActividades = async () => {
    setIsLoading(true);
    try {
      const response = await listarActividades();

      if (response.error) {
        toast.error("Error al obtener las actividades");
        return [];
      }

      setActividades(response.actividades || []);
      return response.actividades;
    } catch (error) {
      toast.error(error.message || "Error al conectar con el servidor");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const obtenerActividadPorId = async (id) => {
    setIsLoading(true);
    try {
      const response = await actividadById(id);

      if (response.error) {
        toast.error("Actividad no encontrada");
        return null;
      }

      setActividad(response.actividad);
      return response.actividad;
    } catch (error) {
      toast.error(error.message || "Error al obtener la actividad");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const editarActividad = async (id, formData) => {
    setIsLoading(true);
    try {
      const response = await updateActividad(id, formData);

      if (response.error) {
        toast.error("Error al actualizar la actividad");
        return null;
      }

      toast.success("Actividad actualizada correctamente");
      return response.actividad;
    } catch (error) {
      toast.error(error.message || "Error al conectar con el servidor");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const borrarActividad = async (id) => {
    setIsLoading(true);
    try {
      const response = await eliminarActividad(id);

      if (response.error) {
        toast.error("Error al eliminar la actividad");
        return null;
      }

      toast.success("Actividad eliminada correctamente");
      setActividades((prev) => prev.filter((a) => a._id !== id));
      return response.actividad;
    } catch (error) {
      toast.error(error.message || "Error al eliminar la actividad");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const obtenerMiembrosDeActividad = async (actividadId) => {
    setIsLoading(true);
    try {
      const response = await miembrosActividad(actividadId);

      if (response.error) {
        toast.error("Error al obtener los miembros de la actividad");
        return [];
      }

      setMiembros(response.asistentes || []);
      return response.asistentes;
    } catch (error) {
      toast.error(error.message || "Error al conectar con el servidor");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    actividades,
    actividad,
    miembros,
    crearActividad,
    obtenerActividades,
    obtenerActividadPorId,
    editarActividad,
    borrarActividad,
    obtenerMiembrosDeActividad,
  };
};
