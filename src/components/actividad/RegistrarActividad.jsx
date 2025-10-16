import { useState } from "react";
import { useActividad } from "../../shared/hooks/useActividad";
import { Loader2, CalendarDays, FileText, CheckSquare } from "lucide-react";

export const RegistrarActividad = () => {
  const { crearActividad, isLoading } = useActividad();
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    estado: "Pendiente",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.descripcion || !formData.fecha) {
      alert("Por favor completa todos los campos");
      return;
    }
    await crearActividad(formData);
    setFormData({ nombre: "", descripcion: "", fecha: "" });
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center justify-center px-6 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-[#0f172a] mb-6">
          Registrar Actividad
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
              <FileText size={16} /> Nombre de la Actividad
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ejemplo: Reunión semanal"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0f172a] focus:border-[#0f172a] outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
              <FileText size={16} /> Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe brevemente la actividad..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0f172a] focus:border-[#0f172a] outline-none resize-none"
              rows={3}
            ></textarea>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
              <CalendarDays size={16} /> Fecha
            </label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#0f172a] focus:border-[#0f172a] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-[#0f172a] text-white py-3 rounded-xl font-medium hover:bg-[#1e293b] transition-all disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Guardando...
              </>
            ) : (
              "Registrar Actividad"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
