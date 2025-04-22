import { useEffect, useState } from "react";

export const useFetchMovies = (searchTerm = "a", limit = 5) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = "d511530c"; // Usa tu propia API Key

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      // Si searchTerm es un 'id', obtenemos los detalles completos de la película.
      if (searchTerm.length === 9) { // El imdbID siempre tiene 9 caracteres
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&i=${searchTerm}&plot=full`
          );
          const data = await res.json();

          if (data.Response === "True") {
            setMovies([data]); // Sólo una película, por eso se guarda en un arreglo
          } else {
            setMovies([]); // Si no hay resultados, se vacía el array
          }
        } catch (err) {
          console.error("Error fetching movie details:", err);
          setMovies([]); // En caso de error, vaciar el array
        }
      } else {
        // Si no es un ID, buscamos por categoría (searchTerm)
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie&page=1`
          );
          const data = await res.json();

          if (data.Response === "True" && data.Search) {
            // Mezclar las películas de manera aleatoria
            const shuffled = data.Search.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, limit);

            // Filtrar las películas con datos incompletos
            const detailedMovies = await Promise.all(
              selected.map(async (movie) => {
                const res = await fetch(
                  `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=full`
                );
                const fullDetails = await res.json();

                // Verificar si la película tiene datos completos
                if (fullDetails.Response === "True" && fullDetails.Plot !== "N/A" && fullDetails.Poster !== "N/A") {
                  return fullDetails; // Agregar solo películas válidas
                }
                return null; // Si los datos son inválidos, no los agregamos
              })
            );

            // Filtrar películas nulas (sin datos completos)
            setMovies(detailedMovies.filter(movie => movie !== null));
          } else {
            setMovies([]); // Si no hay películas, vaciar el array
          }
        } catch (err) {
          console.error("Error fetching movies:", err);
          setMovies([]); // En caso de error, vaciar el array
        }
      }

      setLoading(false); // Terminar el loading
    };

    fetchMovies();
  }, [searchTerm, limit]);

  return { movies, loading };
};
