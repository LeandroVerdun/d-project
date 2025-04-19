// components/PrincipalCategorias.jsx
import React, { useState, useEffect } from "react";
import MovieSlider from "./MovieSlider";

const PrincipalCategorias = () => {
  const apiKey = "d511530c";
  const categories = ["Action", "Comedy", "Drama"];
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("PrincipalCategorias component rendered");
  console.log("Categories:", categories);

  useEffect(() => {
    const fetchMoviesByCategory = async (category) => {
      try {
        const apiUrl = `/api/?apikey=${apiKey}&s=${category}&type=movie`; // URL para el proxy de Vite
        console.log(`Fetching URL for ${category}:`, apiUrl);
        const response = await fetch(apiUrl); // ¡Usando la apiUrl del proxy!
        console.log(`Response for ${category}:`, response);
        const data = await response.json();
        if (data.Response === "True" && data.Search) {
          console.log(`Movies found for ${category}:`, data.Search.slice(0, 5));
          // Tomar solo las primeras 5 películas
          setMovies((prevMovies) => ({
            ...prevMovies,
            [category]: data.Search.slice(0, 5),
          }));
        } else {
          console.error(
            `No se encontraron películas para la categoría: ${category}`,
            data.Error
          );
          setError(
            `No se encontraron películas para la categoría: ${category}`
          );
        }
      } catch (error) {
        console.error(`Error fetching ${category} movies:`, error);
        setError(`Error al cargar películas de ${category}`);
      }
    };

    const fetchAllMovies = async () => {
      setLoading(true);
      setError(null);
      const promises = categories.map((category) =>
        fetchMoviesByCategory(category)
      );
      await Promise.all(promises);
      setLoading(false);
    };

    fetchAllMovies();
  }, []);

  if (loading) {
    console.log("Loading state");
    return <div>Cargando películas...</div>;
  }

  if (error) {
    console.log("Error state:", error);
    return <div>Error al cargar las películas: {error}</div>;
  }
  console.log("Movies state:", movies);
  return (
    <div>
      {categories.map((category) => (
        <MovieSlider
          key={category}
          category={category}
          movies={movies[category] || []}
        />
      ))}
    </div>
  );
};

export default PrincipalCategorias;
