import { useNavigate } from "react-router-dom";
import { UserPlus, Users, CalendarPlus, CalendarCheck, FileDown } from "lucide-react";
import { ReporteAsistencia } from "../../components/asistencia/ReporteAsistencia";


export const DashboardPage = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Agregar Miembro",
      description: "Ingresa los datos del miembro para registrarlo.",
      icon: <UserPlus size={24} />,
      action: () => navigate("/registrar-miembro"),
    },
    {
      title: "Ver Miembros",
      description: "Consulta la lista de todos los miembros registrados y verificar su asistencia.",
      icon: <Users size={24} />,
      action: () => navigate("/miembros"),
    },
    {
      title: "Agregar Actividad",
      description: "Registra una nueva actividad.",
      icon: <CalendarPlus size={24} />,
      action: () => navigate("/registrar-actividad"),
    },
    {
      title: "Lista de Actividades",
      description: "Consulta todas las actividades registradas para tomar asistencia.",
      icon: <CalendarCheck size={24} />,
      action: () => navigate("/actividades"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-6 py-8">
      <div className="w-full grid grid-cols-1 gap-4">
        {options.map((option) => (
          <button
            key={option.title}
            onClick={option.action}
            className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 text-center"
          >
            <div className="bg-gray-900 text-white p-4 rounded-full mb-4 flex items-center justify-center">
              {option.icon}
            </div>
            <h2 className="font-semibold text-gray-900 mb-2">{option.title}</h2>
            <p className="text-gray-500 text-sm">{option.description}</p>
          </button>
        ))}

        <div className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 text-center">
          <div className="bg-green-700 text-white p-4 rounded-full mb-4 flex items-center justify-center">
            <FileDown size={24} />
          </div>
          <h2 className="font-semibold text-gray-900 mb-2">Reporte de Asistencias</h2>
          <p className="text-gray-500 text-sm mb-4">
            Descarga el reporte general de asistencia de todos los miembros.
          </p>

          <ReporteAsistencia />
        </div>
      </div>
    </div>
  );
};
