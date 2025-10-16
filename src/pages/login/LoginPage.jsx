import { User, Lock } from "lucide-react";
import { useState } from "react";
import { useLogin } from "../../shared/hooks/useLogin";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, isLoading } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <div className="min-h-screen bg-[#010326] flex flex-col items-center justify-center px-6 text-white relative overflow-hidden">
      <div className="absolute w-[220px] h-[220px] bg-[#142130]/20 rounded-full top-[-60px] left-[-40px] blur-3xl"></div>
      <div className="absolute w-[300px] h-[300px] bg-[#1b3049]/20 rounded-full bottom-[-80px] right-[-60px] blur-3xl"></div>
      <div className="absolute w-[150px] h-[250px] bg-[#0a153b]/15 rounded-full top-[50%] left-[-50px] blur-2xl transform -translate-y-1/2 rotate-12"></div>
      <div className="absolute w-[180px] h-[180px] bg-[#0f1f50]/10 rounded-full bottom-[20%] right-[-40px] blur-2xl transform rotate-45"></div>

      <div className="w-full max-w-sm p-6 rounded-2xl backdrop-blur-sm flex flex-col items-center z-10">
        <img
          src="/logo_Hermandad.png"
          alt="Escudo Hermandad"
          className="w-24 h-24 mb-6"
        />

        <h1 className="text-2xl font-bold text-center mb-6">
          Iniciar Sesión
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
          <div className="flex items-center bg-[#142130] rounded-xl px-4 py-3 gap-3">
            <User size={20} className="text-gray-300" />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center bg-[#142130] rounded-xl px-4 py-3 gap-3">
            <Lock size={20} className="text-gray-300" />
            <input
              type="password"
              placeholder="Contraseña"
              className="bg-transparent outline-none text-white placeholder-gray-400 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading} // Bloquea mientras carga
            className={`bg-[#142130] text-white font-semibold rounded-2xl py-3 mt-2 shadow-md hover:bg-[#1b3049] hover:scale-105 transform transition-all duration-300 ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};
