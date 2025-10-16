import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { useUser } from "../../shared/hooks/useUser";

export const ActividadMiembro = ({miembroId}) => {
  const { actividades, obtenerActividadesDeMiembro, isLoading } = useUser();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (miembroId) {
      obtenerActividadesDeMiembro(miembroId).then((data) => {
        setTotal(data?.length || 0);
      });
    }
  }, [miembroId]);

  return (
    <div className="min-h-screen bg-[#f9fafb] px-4 py-6">
      <h1 className="text-2xl font-semibold text-[#0f172a] text-center mb-2">
        Actividades del Miembro
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Total: {total} {total === 1 ? "actividad" : "actividades"}
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#0f172a]" />
        </div>
      ) : actividades.length === 0 ? (
        <p className="text-center text-gray-500">
          Aún no ha asistido a ninguna actividad.
        </p>
      ) : (
        <div className="grid gap-4">
          {actividades.map((actividad) => (
            <div
              key={actividad.id}
              className="bg-gray-200 rounded-2xl shadow-sm p-4 flex flex-col gap-2 border border-gray-100"
            >
              <div className="flex items-center gap-2 text-sm">
                <CalendarDays size={16} className="text-[#0f172a]" />
                <span className="text-[#0f172a] font-medium">
                  {actividad.nombre}
                </span>
              </div>
              <p className="text-gray-500 text-xs">
                {new Date(actividad.fecha).toLocaleDateString("es-ES", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
