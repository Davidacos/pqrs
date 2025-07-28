import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const PQRSPage = () => {
  const [pqrsData, setPqrsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "http://localhost:4000/Api/PQRs";

  useEffect(() => {
    const fetchPQRS = async () => {
      try {
        const response = await fetch(apiUrl);
        const result = await response.json();

        // ✅ ACCEDEMOS A result.data
        if (Array.isArray(result.data)) {
          setPqrsData(result.data);
        } else {
          setError("La respuesta del servidor no contiene un arreglo válido.");
        }
      } catch (err) {
        console.error("Error al cargar PQRS:", err);
        setError("No se pudo conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchPQRS();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded shadow-md p-6 overflow-x-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          📋 Tabla de PQRS
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-12 text-blue-600">
            <FaSpinner className="animate-spin mr-2" />
            Cargando datos...
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : pqrsData.length === 0 ? (
          <p className="text-center text-gray-500">
            No hay registros disponibles.
          </p>
        ) : (
          <table className="min-w-full divide-y divide-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Teléfono</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Motivo</th>
                <th className="px-4 py-2">Canal</th>
                <th className="px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pqrsData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.phone}</td>
                  <td className="px-4 py-2 capitalize">{item.requestType}</td>
                  <td className="px-4 py-2">{item.reason}</td>
                  <td className="px-4 py-2">{item.submissionChannel}</td>
                  <td className="px-4 py-2">
                    {new Date(item.fecha_registro).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PQRSPage;
