import { useEffect, useState } from "react";
import { X, Search, CheckCircle2, User } from "lucide-react";
import { useAsistencia } from "../../shared/hooks/useAsistencia";
import { useUser } from "../../shared/hooks/useUser";

export const TomarAsistencia = ({ actividadId, onClose }) => {
  const { tomarAsistencia, isLoading } = useAsistencia();
  const { usuarios, obtenerUsuarios } = useUser();

  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  useEffect(() => {
    if (query.length >= 4) {
      const results = usuarios.filter((u) =>
        `${u.nombre} ${u.apellido}`.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(results);
    } else {
      setFilteredUsers([]);
    }
  }, [query, usuarios]);

  const handleRegistrar = async (user) => {
    const response = await tomarAsistencia({
      usuarioId: user.uid,
      actividadId,
    });

    if (!response || response.error) {
      setSuccessMsg("❌ Error al registrar asistencia");
      return;
    }

    setSelectedUser(user);
    setSuccessMsg("✅ Asistencia registrada correctamente");

    setTimeout(() => {
      setSelectedUser(null);
      setSuccessMsg("");
      setQuery("");
      setFilteredUsers([]);
      onClose?.(); 
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-md rounded-2xl p-5 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-[#0f172a] mb-3 text-center">
          Tomar Asistencia Manual
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Busca un miembro y marca su asistencia.
        </p>

        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2 mb-3">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Escribe al menos 4 letras del nombre..."
            className="flex-1 outline-none text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="max-h-60 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.uid}
                className="flex items-center justify-between border-b border-gray-100 py-2 px-2 hover:bg-gray-100 rounded-lg transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="bg-[#0f172a] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    {user.nombre[0].toUpperCase()}
                  </div>
                  <p className="text-gray-800 text-sm font-medium">
                    {user.nombre} {user.apellido}
                  </p>
                </div>
                <button
                  onClick={() => handleRegistrar(user)}
                  className="bg-[#436E73] text-white px-3 py-1.5 rounded-lg text-xs hover:bg-[#36595d] transition disabled:opacity-50"
                  disabled={isLoading}
                >
                  Marcar
                </button>
              </div>
            ))
          ) : query.length >= 4 ? (
            <p className="text-center text-gray-400 text-sm mt-2">
              No se encontraron miembros.
            </p>
          ) : (
            <p className="text-center text-gray-400 text-sm mt-2">
              Escribe al menos 4 letras para buscar...
            </p>
          )}
        </div>

        {successMsg && (
          <div className="mt-4 text-center flex items-center justify-center gap-2 text-green-600 font-medium">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
