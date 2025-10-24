import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import { useUser } from "../../shared/hooks/useUser";

export const ReporteAsistencia = () => {
  const { obtenerUsuarios } = useUser();

  const generarReporteCompleto = async () => {
    try {
      toast.loading("Generando reporte de asistencia...", { id: "reporte" });

      // 1️⃣ Obtener todos los usuarios
      const usuarios = await obtenerUsuarios();

      if (!usuarios || usuarios.length === 0) {
        toast.error("No hay usuarios registrados", { id: "reporte" });
        return;
      }

      // 2️⃣ Crear documento PDF
      const doc = new jsPDF();

      // Encabezado
      doc.setFontSize(18);
      doc.text("Reporte General de Asistencia", 60, 20);

      doc.setFontSize(11);
      const fecha = new Date().toLocaleDateString();
      doc.text(`Fecha de generación: ${fecha}`, 14, 30);

      // 3️⃣ Construir tabla
      const columnas = [
        "Nombre Completo",
        "Asistencias",
        "Porcentaje (%)"
      ];

      const filas = usuarios.map((u) => [
        `${u.nombre} ${u.apellido}`,
        u.asistencia || 0,
        `${u.porcentajeAsistencia || 0}%`,
      ]);

      autoTable(doc, {
        head: [columnas],
        body: filas,
        startY: 40,
        styles: {
          fontSize: 10,
          halign: "center",
          valign: "middle",
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      });

      const nombreArchivo = `Reporte_Asistencia_Completo_${fecha}.pdf`;
      doc.save(nombreArchivo);

      toast.success("Reporte descargado correctamente", { id: "reporte" });
    } catch (error) {
      console.error("❌ Error generando reporte:", error);
      toast.error("Error al generar el reporte", { id: "reporte" });
    }
  };

  return (
    <button
      onClick={generarReporteCompleto}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all duration-200"
    >
      Descargar Reporte General PDF
    </button>
  );
};
