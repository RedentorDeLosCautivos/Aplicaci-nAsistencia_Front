import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Clock,
    MapPin,
    Users,
    Trash2,
    CheckSquare,
    QrCode,
    X,
} from "lucide-react";
import { useActividad } from "../../shared/hooks/useActividad";
import { LoadingSpinner } from "../loadinSpinner/LoadingSpinner";
import { RegistrarAsistencia } from "../asistencia/RegistrarAsistencia";
import { MiembrosActividad } from "./MiembrosActividad"; 
import { motion } from "framer-motion";

export const DetalleActividad = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { obtenerActividadPorId, borrarActividad, actividad, isLoading } = useActividad();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showQRScanner, setShowQRScanner] = useState(false);
    const [showMiembros, setShowMiembros] = useState(false); 

    useEffect(() => {
        obtenerActividadPorId(id);
    }, [id]);

    const handleDelete = async () => {
        await borrarActividad(id);
        navigate("/actividades");
    };

    if (isLoading || !actividad) {
        return <LoadingSpinner />;
    }

    const fecha = new Date(actividad.fecha);

    return (
        <div className="min-h-screen bg-[#f9fafb] px-4 py-8">
            {/* Card de actividad */}
            <div className="bg-[#e2e8f0] rounded-2xl shadow-md p-5 mb-6">
                <h1 className="text-2xl font-bold text-[#142130] mb-2">{actividad.nombre}</h1>
                <p className="text-gray-700 mb-4 text-sm">
                    {actividad.descripcion || "Sin descripción disponible."}
                </p>

                <div className="flex flex-col gap-2 text-gray-700 text-sm">
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        <span>
                            {fecha.toLocaleDateString("es-ES", {
                                weekday: "long",
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                    {actividad.hora && (
                        <div className="flex items-center gap-2">
                            <Clock size={16} /> <span>{actividad.hora}</span>
                        </div>
                    )}
                    {actividad.lugar && (
                        <div className="flex items-center gap-2">
                            <MapPin size={16} /> <span>{actividad.lugar}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Botones móviles */}
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => setShowQRScanner(true)}
                        className="flex items-center justify-center gap-3 bg-[#142130] text-white py-4 rounded-2xl font-semibold text-base hover:bg-[#00020D] transition-all"
                    >
                        <QrCode size={20} /> Escanear QR
                    </button>

                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="flex items-center justify-center gap-3 bg-[#1B263B] text-white py-4 rounded-2xl font-semibold text-base hover:bg-[#00020D] transition-all"
                    >
                        <Trash2 size={20} /> Eliminar
                    </button>
                </div>

                <button
                    onClick={() => setShowMiembros(true)}
                    className="flex items-center justify-center gap-3 bg-[#142130] text-white py-4 rounded-2xl font-semibold text-base hover:bg-[#00020D] transition-all"
                >
                    <Users size={20} /> Ver Miembros que Asistieron
                </button>
            </div>

            {showMiembros && <MiembrosActividad id={id} />}

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl p-5 w-full max-w-sm text-center shadow-lg">
                        <p className="text-gray-700 mb-5 text-sm">
                            ¿Seguro que deseas eliminar esta actividad?
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white py-3 rounded-2xl font-semibold hover:bg-red-600 transition-all"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-400 transition-all"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showQRScanner && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.25 }}
                        className="relative bg-white rounded-2xl w-full max-w-sm shadow-xl p-5 flex flex-col items-center"
                        style={{ height: "70vh", maxHeight: "480px" }}
                    >
                        <button
                            onClick={() => setShowQRScanner(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
                        >
                            <X size={22} />
                        </button>

                        <div className="w-full flex-1 flex items-center justify-center">
                            <RegistrarAsistencia actividadId={id} />
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
