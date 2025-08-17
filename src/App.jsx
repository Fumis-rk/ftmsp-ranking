import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function App() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAthlete, setSelectedAthlete] = useState(null);

  useEffect(() => {
    Papa.parse("/ranking.csv", {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
        const cats = [...new Set(results.data.map((row) => row.Categoria))];
        setCategories(cats);
        setSelectedCategory(cats[0]);
      },
    });
  }, []);

  const athletes = data
    .filter((row) => row.Categoria === selectedCategory)
    .sort((a, b) => Number(b.Total) - Number(a.Total));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 text-black p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
        Ranking FTMSP 2025
      </h1>

      {/* Seletor de categorias */}
      <div className="flex justify-center mb-6">
        <select
          className="p-2 rounded bg-white border border-gray-400"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de atletas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {athletes.map((ath, idx) => (
          <div
            key={idx}
            className="cursor-pointer bg-white shadow hover:shadow-lg border border-gray-300 p-4 rounded"
            onClick={() => setSelectedAthlete(ath)}
          >
            <h2 className="text-lg font-semibold text-gray-900">{ath.Atleta}</h2>
            <p className="text-sm text-gray-600">Clube: {ath.Clube}</p>
            <p className="text-sm text-gray-600">Ranking: {ath.Ranking}</p>
            <p className="text-sm text-red-600 font-bold">
              Pontos: {ath.Total}
            </p>
          </div>
        ))}
      </div>

      {/* Modal simples */}
      {selectedAthlete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedAthlete.Atleta} ({selectedAthlete.Categoria})
            </h2>
            <div className="space-y-2">
              {Object.keys(selectedAthlete)
                .filter((key) => key.startsWith("Etapa"))
                .map((etapa) => (
                  <div
                    key={etapa}
                    className="flex justify-between border-b pb-1"
                  >
                    <span>{etapa}</span>
                    <span className="font-semibold text-gray-700">
                      {selectedAthlete[etapa]}
                    </span>
                  </div>
                ))}
            </div>
            <button
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              onClick={() => setSelectedAthlete(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}