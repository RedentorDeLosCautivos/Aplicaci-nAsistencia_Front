import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  IdCard,
  QrCode,
  Edit2,
  Save,
  Trash2,
  UserCheck
} from "lucide-react";
import { useUser } from "../../shared/hooks/useUser";
import { LoadingSpinner } from "../loadinSpinner/LoadingSpinner";
import { ActividadMiembro } from "./ActividadMiembro";

export const UsuarioDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerUsuarioPorId, editarUsuario, borrarUsuario, usuario, isLoading } = useUser();

  const [mostrarQR, setMostrarQR] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showActividades, setShowActividades] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
  });

  useEffect(() => {
    obtenerUsuarioPorId(id);
  }, [id]);

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre || "",
        apellido: usuario.apellido || "",
        correo: usuario.correo || "",
        telefono: usuario.telefono || "",
        direccion: usuario.direccion || "",
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await editarUsuario(usuario.uid, formData);
    setEditMode(false);
  };

  const handleDelete = async () => {
    await borrarUsuario(usuario.uid);
    navigate("/miembros");
  };

  if (isLoading || !usuario) {
    return (
      <LoadingSpinner/>
    );
  }

  const porcentaje = usuario.porcentajeAsistencia || 0;

  return (
    <div className="min-h-screen bg-[#f9fafb] px-4 py-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-5 text-center">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-5">
          <div className="bg-[#0f172a] text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold mb-3">
            {usuario.nombre?.[0]?.toUpperCase()}
          </div>
          {!editMode ? (
            <>
              <h2 className="text-xl font-bold text-[#0f172a]">{usuario.nombre} {usuario.apellido}</h2>
              <p className="text-gray-500 text-sm">Miembro de la Hermandad</p>
            </>
          ) : (
            <div className="grid gap-3 w-full">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                placeholder="Nombre"
              />
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                placeholder="Apellido"
              />
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                placeholder="Correo"
              />
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                placeholder="Teléfono"
              />
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#0f172a]"
                placeholder="Dirección"
              />
            </div>
          )}
        </div>

        {/* Información adicional */}
        {!editMode && (
          <div className="grid gap-3 text-left mt-5">
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <IdCard size={16} /> <span>{usuario.dpi}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <Mail size={16} /> <span>{usuario.correo}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <Phone size={16} /> <span>{usuario.telefono}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <MapPin size={16} /> <span>{usuario.direccion}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <Calendar size={16} />{" "}
              <span>Nacimiento: {new Date(usuario.fechaNacimiento).toLocaleDateString("es-ES")}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <Calendar size={16} />{" "}
              <span>Ingreso: {new Date(usuario.fechaIngreso).toLocaleDateString("es-ES")}</span>
            </div>

            {/* Porcentaje de asistencia */}
            <div className="mt-4 flex items-center justify-between bg-[#436E73]/20 border border-[#436E73] text-[#436E73] px-4 py-3 rounded-xl shadow-md">
              <span className="font-medium">Asistencia</span>
              <span className="font-bold text-lg">{porcentaje}%</span>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="grid grid-cols-2 gap-2 mt-6">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center justify-center gap-1 bg-[#0f172a] text-white py-2 rounded-xl text-sm font-medium hover:bg-[#1e293b] transition-all"
            >
              <Edit2 size={16} /> Editar
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-1 bg-green-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-all"
            >
              <Save size={16} /> Guardar
            </button>
          )}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center justify-center gap-1 bg-red-500 text-white py-2 rounded-xl text-sm font-medium hover:bg-red-600 transition-all"
          >
            <Trash2 size={16} /> Eliminar
          </button>
        </div>

        {/* Botones QR y Actividades Asistidas */}
        <div className="mt-4">
          <button
            onClick={() => setMostrarQR(!mostrarQR)}
            className="w-full flex items-center justify-center gap-2 bg-[#0f172a] text-white py-2 rounded-xl font-medium hover:bg-[#1e293b] transition-all mb-2"
          >
            <QrCode size={18} /> {mostrarQR ? "Ocultar QR" : "Ver QR"}
          </button>
          <button
            onClick={() => setShowActividades(!showActividades)}
            className="w-full flex items-center justify-center gap-2 bg-[#436E73] text-white py-2 rounded-xl font-medium hover:bg-[#1e293b] transition-all"
          >
            <UserCheck size={18} /> Actividades Asistidas
          </button>
        </div>
      </div>

      {showActividades && <ActividadMiembro miembroId={id}/>}

      {mostrarQR && usuario.qrDataUrl && (
        <div className="mt-5 flex justify-center">
          <img
            src={usuario.qrDataUrl}
            alt="Código QR del miembro"
            className="w-40 h-40 shadow-md rounded-xl"
          />
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-11/12 max-w-sm text-center shadow-lg">
            <p className="text-gray-700 mb-5">
              ¿Seguro que deseas eliminar este miembro?
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 rounded-xl font-medium hover:bg-red-600 transition-all"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-400 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
