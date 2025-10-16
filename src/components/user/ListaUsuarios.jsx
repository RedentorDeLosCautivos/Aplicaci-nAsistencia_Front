import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Search } from "lucide-react";
import { useUser } from "../../shared/hooks/useUser";
import { LoadingSpinner } from "../loadinSpinner/LoadingSpinner";

export const ListaUsuarios = () => {
  const navigate = useNavigate();
  const { usuarios, obtenerUsuarios, isLoading } = useUser();
  const [search, setSearch] = useState("");
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  useEffect(() => {
    setFilteredUsuarios(
      usuarios.filter((u) =>
        `${u.nombre} ${u.apellido}`.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, usuarios]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] px-6 py-10">
      <div className="text-center mb-8 bg-[#436E73] rounded-xl p-4">
        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
          Miembros de la Hermandad
        </h1>
      </div>

      <div className="max-w-md mx-auto mb-8 relative">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Buscar miembro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-[#0f172a]/50 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsuarios.map((u) => (
          <div
            key={u._id}
            onClick={() => navigate(`/miembros/${u.uid}`)}
            className="group bg-gradient-to-br from-white to-[#e4e9f0] border border-gray-100 shadow-lg rounded-2xl p-5 flex flex-col gap-2 cursor-pointer hover:scale-[1.03] transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#0f172a] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md text-lg font-bold">
                {u.nombre?.[0]?.toUpperCase()}
              </div>
              <h3 className="text-lg font-semibold text-[#0f172a] leading-tight">
                {u.nombre} {u.apellido}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <Mail size={16} className="text-[#0f172a]/70" />
              <span className="truncate">{u.correo}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-700 text-sm">
              <Phone size={16} className="text-[#0f172a]/70" />
              <span>{u.telefono}</span>
            </div>

            <span className="mt-2 text-xs text-gray-400 group-hover:text-[#0f172a]/80 transition-colors text-right">
              Ver detalles →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
