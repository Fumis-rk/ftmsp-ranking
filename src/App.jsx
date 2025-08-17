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
    <div className=\"min-h-screen bg-ftmsp-light p-6\">
      <h1 className=\"text-4xl font-bold text-center mb-8 text-ftmsp-red\">
        Ranking FTMSP 2025
      </h1>

      {/* Seletor de categorias */}
      <div className=\"flex justify-center mb-6\">
        <select
          className=\"p-2 rounded border border-ftmsp-gray bg-white text-ftmsp-gray font-medium\"
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
      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\">
        {athletes.map((ath, idx) => (
          <div
            key={idx}
            className=\"cursor-pointer bg-white shadow-lg border border-gray-300 p-4 rounded-lg hover:scale-105 transition-transform\"
            onClick={() => setSelectedAthlete(ath)}
          >
            <h2 className=\"text-lg font-bold text-ftmsp-gray\">{ath.Atleta}</h2>
            <p className=\"text-sm text-gray-600\">Clube: {ath.Clube}</p>
            <p className=\"text-sm text-gray-600\">Ranking: {ath.Ranking}</p>
            <p className=\"text-md text-ftmsp-red font-bold\">
              Pontos: {ath.Total}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedAthlete && (
        <div className=\"fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4\">
          <div className=\"bg-white p-6 rounded-lg max-w-md w-full shadow-xl\">
            <h2 className=\"text-2xl font-bold mb-4 text-ftmsp-red\">
              {selectedAthlete.Atleta}
            </h2>
            <p className=\"mb-2 text-ftmsp-gray\">
              Categoria: {selectedAthlete.Categoria}
            </p>
            <div className=\"space-y-2\">
              {Object.keys(selectedAthlete)
                .filter((key) => key.startsWith(\"Etapa\"))
                .map((etapa) => (
                  <div
                    key={etapa}
                    className=\"flex justify-between border-b pb-1 text-ftmsp-gray\"
                  >
                    <span>{etapa}</span>
                    <span className=\"font-semibold\">
                      {selectedAthlete[etapa]}
                    </span>
                  </div>
                ))}
            </div>
            <button
              className=\"mt-6 bg-ftmsp-red hover:bg-red-700 text-white px-4 py-2 rounded\"
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