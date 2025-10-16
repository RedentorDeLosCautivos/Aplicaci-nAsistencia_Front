import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  registrarUsuario,
  listarUsuarios,
  usuarioById,
  updateUsuario,
  eliminarUsuario,
  actividadesMiembro, 
} from "../../services/api"; 

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [actividades, setActividades] = useState([]); 

  const crearUsuario = async (formData) => {
    setIsLoading(true);
    try {
      const response = await registrarUsuario(formData);

      if (response.error) {
        toast.error(
          response.e?.response?.data?.message || "Error al registrar el miembro"
        );
        return null;
      }

      toast.success("Miembro registrado correctamente");
      return response.usuario || response.data;
    } catch (error) {
      toast.error(error.message || "Error al registrar el miembro");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const obtenerUsuarios = async () => {
    setIsLoading(true);
    try {
      const response = await listarUsuarios();

      if (response.error) {
        toast.error("Error al obtener los miembros");
        return [];
      }

      setUsuarios(response.usuarios || []);
      return response.usuarios;
    } catch (error) {
      toast.error(error.message || "Error al conectar con el servidor");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const obtenerUsuarioPorId = async (id) => {
    setIsLoading(true);
    try {
      const response = await usuarioById(id);

      if (response.error) {
        toast.error("Usuario no encontrado");
        return null;
      }

      setUsuario(response.usuario);
      return response.usuario;
    } catch (error) {
      toast.error(error.message || "Error al obtener usuario");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const obtenerActividadesDeMiembro = async (miembroId) => {
    setIsLoading(true);
    try {
      const response = await actividadesMiembro(miembroId);

      if (response.error) {
        toast.error("Error al obtener actividades del miembro");
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

  const editarUsuario = async (id, formData) => {
    setIsLoading(true);
    try {
      const response = await updateUsuario(id, formData);

      if (response.error) {
        toast.error("Error al actualizar usuario");
        return null;
      }

      toast.success("Usuario actualizado correctamente");
      return response.usuario;
    } catch (error) {
      toast.error(error.message || "Error al conectar con el servidor");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const borrarUsuario = async (id) => {
    setIsLoading(true);
    try {
      const response = await eliminarUsuario(id);

      if (response.error) {
        toast.error("Error al eliminar usuario");
        return null;
      }

      toast.success("Usuario eliminado correctamente");
      setUsuarios((prev) => prev.filter((u) => u._id !== id));
      return response.usuario;
    } catch (error) {
      toast.error(error.message || "Error al eliminar usuario");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    usuarios,
    usuario,
    actividades, 
    crearUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    obtenerActividadesDeMiembro, 
    editarUsuario,
    borrarUsuario,
  };
};
