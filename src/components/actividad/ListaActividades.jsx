import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CalendarDays, Clock } from "lucide-react";
import { useActividad } from "../../shared/hooks/useActividad";
import { LoadingSpinner } from "../loadinSpinner/LoadingSpinner";

export const ListaActividades = () => {
  const { obtenerActividades, actividades, isLoading } = useActividad();
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerActividades();
  }, []);

  useEffect(() => {
    const filtradas = actividades
      .filter((act) =>
        act.nombre.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); 

    setFiltered(filtradas);
  }, [actividades, search]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-white px-5 py-10">
      <div className="text-center mb-8 bg-[#436E73] rounded-xl p-4">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
          Actividades
        </h1>
        <p className="text-white text-sm">Lista completa de actividades registradas</p>
      </div>

      <div className="max-w-md mx-auto mb-8 relative">
        <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar actividad..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-[#2563eb]/40 outline-none transition-all"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 mt-12">
          No hay actividades registradas.
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          {filtered.map((act) => {
            const fecha = new Date(act.fecha);
            return (
              <div
                key={act._id}
                onClick={() => navigate(`/actividad/${act.uid}`)}
                className="group relative overflow-hidden border border-gray-200 shadow-md rounded-2xl p-5 transition-all duration-300 bg-gray-100 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-[#436E73]">
                    {act.nombre}
                  </h3>
                </div>

                <p className="text-sm text-[#436E73] mb-4 line-clamp-2">
                  {act.descripcion || "Sin descripción disponible."}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-gray-600" />
                    <span className="capitalize">
                      {fecha.toLocaleDateString("es-ES", {
                        weekday: "short",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {act.hora && (
                    <div className="flex items-center gap-1">
                      <Clock size={15} />
                      <span>{act.hora}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
