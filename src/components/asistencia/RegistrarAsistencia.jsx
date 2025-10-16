import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useAsistencia } from "../../shared/hooks/useAsistencia";
import { QrCode, CheckCircle2, Camera } from "lucide-react";

export const RegistrarAsistencia = ({ actividadId }) => {
  const { tomarAsistencia, isLoading } = useAsistencia();
  const [qrScanned, setQrScanned] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [cameraError, setCameraError] = useState(false);

  const handleScan = async (result) => {
    if (result && !qrScanned) {
      setQrScanned(true);
      const response = await tomarAsistencia({
        qrToken: result.text,
        actividadId,
      });

      if (response && !response.error) setSuccessData(response);
      setTimeout(() => setQrScanned(false), 2500);
    }
  };

  const toggleCamera = () =>
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));

  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 py-3 bg-white rounded-2xl">
      <div className="flex flex-col items-center text-center mb-2">
        <div className="bg-[#0f172a] p-3 rounded-full text-white mb-2">
          <QrCode size={22} />
        </div>
        <h2 className="text-lg font-bold text-[#0f172a]">Registrar Asistencia</h2>
        <p className="text-xs text-gray-500 mt-1">
          Escanea el código QR del miembro
        </p>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center">
        {!successData ? (
          <>
            <div className="relative w-full max-w-xs aspect-square overflow-hidden rounded-xl border-2 border-[#0f172a]/10 shadow-sm">
              <QrReader
                onResult={(result, error) => {
                  if (result) handleScan(result);
                  if (error) setCameraError(false);
                }}
                constraints={{ video: { facingMode } }}
                onError={() => setCameraError(true)}
                containerStyle={{ width: "100%", height: "100%" }}
                videoStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {cameraError && (
              <p className="text-red-500 text-sm mt-2 text-center">
                ⚠️ No se pudo acceder a la cámara. Verifica permisos en el navegador.
              </p>
            )}

            <button
              onClick={toggleCamera}
              className="mt-3 flex items-center gap-2 bg-[#0f172a] text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-[#1e293b] transition-all"
            >
              <Camera size={16} />
              {facingMode === "environment" ? "Usar cámara frontal" : "Usar cámara trasera"}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center py-4">
            <CheckCircle2 className="text-green-500 w-12 h-12 mb-2" />
            <h3 className="text-base font-semibold text-gray-800 mb-1">
              {successData.miembro}
            </h3>
            <p className="text-gray-500 text-sm">
              {successData.message || "Asistencia registrada correctamente"}
            </p>
          </div>
        )}
      </div>

      {isLoading && (
        <p className="mt-2 text-gray-500 text-sm animate-pulse">
          Registrando asistencia...
        </p>
      )}
    </div>
  );
};
