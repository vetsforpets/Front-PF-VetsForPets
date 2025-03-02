"use client"
import { useState, useEffect } from "react";

const useDebouncedSearch = (query: string, delay: number) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(handler);
  }, [query, delay]);

  return debouncedQuery;
};

const LocationSearch = ({
  onSelect,
  // onReset,
  // onSubmit
}: {
  onSelect: (lat: number, lon: number) => void;
  onReset: () => void;
  onSubmit: (e: React.FormEvent, resetSearch: () => void) => void;
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<{ display_name: string; lat: string; lon: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedQuery = useDebouncedSearch(query, 500);
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    if (hasSelected || debouncedQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    const buscarUbicaciones = async () => {
      setLoading(true);
      setError("");

      try {
        console.log("Buscando ubicaciones para:", debouncedQuery);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(debouncedQuery)}&format=json&addressdetails=1&limit=5`,
          {
            headers: { "User-Agent": "vetsforpets-app" }
          }
        );

        if (!response.ok) throw new Error("Error al obtener los datos");

        const data = await response.json();
        
        console.log("Resultados de búsqueda:", data);

        if (data.length === 0) {
          setError("No se encontraron ubicaciones.");
        } else {
          setError("");
        }

        setSuggestions(data);
      } catch (error) {
        console.error("Error obteniendo sugerencias:", error);
        setError("Error al obtener ubicaciones.");
      } finally {
        setLoading(false);
      }
    };

    buscarUbicaciones();
  }, [debouncedQuery]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const manejarSeleccion = (direccion: string, lat: string, lon: string) => {
    console.log("Ubicación seleccionada:", direccion, lat, lon);

    setQuery(direccion);
    setTimeout(() => setSuggestions([]), 200);
    onSelect(parseFloat(lat), parseFloat(lon), );
    setHasSelected(true);
  };

  // Función para limpiar el input y sugerencias
  // const resetSearch = () => {
  //   setQuery("");
  //   setSuggestions([]);
  //   onReset();
  // };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={manejarCambio}
        placeholder="Escribe una ubicación actual..."
        className="customInput"
      />

      {loading && <p>Cargando...</p>}
      {error && suggestions.length === 0 && <p style={{ color: "red" }}>{error}</p>}

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item, index) => (
            <li key={index} onClick={() => manejarSeleccion(item.display_name, item.lat, item.lon)}>
              {item.display_name}
            </li>
          ))}
        </ul>
      )}

      {/* <button type="button" onClick={(e) => onSubmit(e, resetSearch)} className="mt-5 mb-5 customButton">Calcular</button> */}
    </div>
  );
};

export default LocationSearch;









// import { useState } from "react";

// const LocationSearch = ({ onSelect }: { onSelect: (lat: number, lon: number) => void }) => {
//   const [query, setQuery] = useState("");
//   const [suggestions, setSuggestions] = useState<{ display_name: string; lat: string; lon: string }[]>([]);

//   const buscarUbicaciones = async (input: string) => {
//     if (input.length < 3) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//         const response = await fetch(
//             `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&addressdetails=1&limit=5&countrycodes=AR&viewbox=-57.6356,-37.8324,-57.4616,-38.1052&bounded=1`
//           );
          
          

//       if (!response.ok) throw new Error("Error al obtener los datos");

//       const data = await response.json();
//       setSuggestions(data);
//     } catch (error) {
//       console.error("Error obteniendo sugerencias:", error);
//     }
//   };

//   const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const valor = e.target.value;
//     setQuery(valor);
//     buscarUbicaciones(valor);
//   };

//   const manejarSeleccion = (direccion: string, lat: string, lon: string) => {
//     setQuery(direccion);
//     setSuggestions([]);
//     onSelect(parseFloat(lat), parseFloat(lon)); // Envía las coordenadas al padre
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={query}
//         onChange={manejarCambio}
//         placeholder="Escribe una ubicación..."
//         className="customInput"
//       />
//       {suggestions.length > 0 && (
//         <ul className="suggestions">
//           {suggestions.map((item, index) => (
//             <li key={index} onClick={() => manejarSeleccion(item.display_name, item.lat, item.lon)}>
//               {item.display_name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LocationSearch;
