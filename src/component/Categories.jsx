// src/component/Categories.jsx

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Categories() {
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const apiKey = "d511530c"; // Reemplaza con tu API key

  useEffect(() => {
    async function fetchMoviesFromAPI() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${category}` // Busca películas por categoría
        );
        const data = await response.json();
        if (data.Search) {
          const moviesWithDetails = await Promise.all(
            data.Search.map(async (movie) => {
              const detailsResponse = await fetch(
                `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=full`
              );
              const details = await detailsResponse.json();
              return {
                Codigo: movie.imdbID,
                Pelicula: movie.Title,
                Descripcion: details.Plot,
                imdbID: movie.imdbID,
                Poster: details.Poster,
              };
            })
          );
          setMovies(moviesWithDetails);
        } else {
          setMovies([]); // No movies found
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]); // Error, show empty list
      }
    }
    if (category) {
      fetchMoviesFromAPI();
    }
  }, [category, apiKey]);

  return (
    <div className="container mt-5">
      <h1>{category ? `${category} Movies` : "All Movies"}</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Poster</th>
            <th>Codigo</th>
            <th>Pelicula</th>
            <th>Descripcion</th>
            <th>Comprar</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.Codigo}>
              <td>
                <img
                  src={movie.Poster}
                  alt={movie.Pelicula}
                  style={{ width: "200px" }}
                />
              </td>
              <td>{movie.Codigo}</td>
              <td>{movie.Pelicula}</td>
              <td>{movie.Descripcion}</td>
              <td>
                <button className="btn btn-primary">Comprar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Categories;
