import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#010326] flex flex-col text-white relative overflow-hidden">
      <div className="relative h-[60vh] md:h-[75vh] w-full">
        <img
          src="/imagen_home.jpeg" 
          alt="Imagen principal de la Hermandad"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010326]/60 to-[#010326]" />
      </div>
      <br /><br />
      <div className="flex flex-col items-center text-center px-6 md:px-10 mt-[-80px] relative z-10">
        <h1 className="text-2xl md:text-4xl font-bold text-[#FFFFFF] mb-4 leading-snug">
          Hermandad de Jesús Nazareno Redentor de los Cautivos y Virgen de Dolores
        </h1>

        <p className="text-gray-300 text-base md:text-lg max-w-2xl mb-8">
          Plataforma de gestión y registro de asistencia para la Hermandad.  
          Administra tus actividades de forma rápida, moderna y segura.
        </p>

        <p className="text-gray-400 italic text-sm mb-10">
          “Si conociéramos el valor de la Santa Misa, moriríamos de amor.”  
          <span className="block not-italic font-medium text-gray-300 mt-1">
            — San Juan María Vianney
          </span>
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-[#142130] text-white font-semibold rounded-2xl px-10 py-3 text-lg shadow-md hover:bg-[#1b3049] hover:scale-105 transform transition-all duration-300 flex items-center gap-3"
        >
          <LogIn size={22} />
          Iniciar Sesión
        </button>
        <br /><br />
      </div>

      <div className="absolute w-[300px] h-[300px] bg-[#142130]/30 rounded-full blur-3xl bottom-[-60px] right-[-80px]"></div>
    </div>
  );
};
