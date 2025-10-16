import React, { useEffect } from "react";
import { UserCheck, IdCard } from "lucide-react";
import { useActividad } from "../../shared/hooks/useActividad";

export const MiembrosActividad = ({ id }) => {
    const { isLoading, miembros, obtenerMiembrosDeActividad } = useActividad();

    useEffect(() => {
        if (id) obtenerMiembrosDeActividad(id);
    }, [id]);

    return (
        <div className="min-h-screen bg-[#f9fafb] px-4 py-6">
            <h1 className="text-2xl font-semibold text-[#0f172a] text-center mb-6">
                Miembros que Asistieron
            </h1>
            <p className="text-center text-gray-500 mb-6">
                Total: {miembros.length} {miembros.length === 1 ? "persona" : "personas"}
            </p>
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#0f172a]" />
                </div>
            ) : miembros.length === 0 ? (
                <p className="text-center text-gray-500">
                    Aún no hay asistentes registrados.
                </p>
            ) : (
                <div className="grid gap-4 pb-6">
                    {miembros.map((asistencia) => (
                        <div
                            key={asistencia.uid}
                            className="bg-gray-200 rounded-2xl shadow-sm p-4 flex flex-col gap-2 border border-gray-100"
                        >
                            <div className="text-sm flex items-center gap-2">
                                <div className="bg-[#0f172a] text-white p-1.5 rounded-full">
                                    <UserCheck size={14} />
                                </div>
                                <h2 className="text-[#0f172a] font-medium">
                                    {asistencia.nombre} {asistencia.apellido}
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
