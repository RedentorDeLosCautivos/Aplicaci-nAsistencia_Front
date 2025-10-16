import { useState } from "react";
import {
  UserPlus,
  Mail,
  Phone,
  MapPin,
  User,
  IdCard,
  Calendar,
} from "lucide-react";
import { useUser } from "../../shared/hooks/useUser";

export const RegistrarUsuario = () => {
  const { crearUsuario, isLoading } = useUser();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dpi: "",
    correo: "",
    telefono: "",
    direccion: "",
    fechaNacimiento: "",
    fechaIngreso: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await crearUsuario(formData);
    setFormData({
      nombre: "",
      apellido: "",
      dpi: "",
      correo: "",
      telefono: "",
      direccion: "",
      fechaNacimiento: "",
      fechaIngreso: "",
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-[#f9fafb] shadow-sm rounded-2xl p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#0f172a] p-4 rounded-full text-white mb-3">
            <UserPlus size={26} />
          </div>
          <h2 className="text-xl font-bold text-[#0f172a] text-center">
            Registrar Nuevo Miembro
          </h2>
          <p className="text-gray-500 text-sm text-center mt-1">
            Ingresa los datos del miembro para registrarlo en la Hermandad.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#0f172a]/50">
            <User size={18} className="text-gray-500 mr-3" />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
            />
          </div>

          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#0f172a]/50">
            <User size={18} className="text-gray-500 mr-3" />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
            />
          </div>

          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#0f172a]/50">
            <IdCard size={18} className="text-gray-500 mr-3" />
            <input
              type="text"
              name="dpi"
              placeholder="DPI"
              value={formData.dpi}
              onChange={handleChange}
              required
              pattern="[0-9]{13}"
              title="Debe contener 13 dígitos numéricos"
              className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 ml-1">
              Fecha de nacimiento
            </label>
            <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#0f172a]/50">
              <Calendar size={18} className="text-gray-500 mr-3" />
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                required
                className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1 ml-1">
              Fecha de ingreso a la hermandad
            </label>
            <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#0f172a]/50">
              <Calendar size={18} className="text-gray-500 mr-3" />
              <input
                type="date"
                name="fechaIngreso"
                value={formData.fechaIngreso}
                onChange={handleChange}
                required
                className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
              />
            </div>
          </div>

          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#0f172a]/50">
            <Mail size={18} className="text-gray-500 mr-3" />
            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={formData.correo}
              onChange={handleChange}
              required
              className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
            />
          </div>

          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#0f172a]/50">
            <Phone size={18} className="text-gray-500 mr-3" />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
            />
          </div>

          <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#0f172a]/50">
            <MapPin size={18} className="text-gray-500 mr-3" />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
              required
              className="bg-transparent outline-none text-gray-700 placeholder-gray-400 w-full"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-3 bg-[#0f172a] text-white font-semibold rounded-xl py-3 transition-all duration-300 ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-[#1e293b] hover:scale-[1.02]"
            }`}
          >
            {isLoading ? "Registrando..." : "Registrar Miembro"}
          </button>
        </form>
      </div>
    </div>
  );
};
