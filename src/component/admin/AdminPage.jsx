import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieTable from "./MovieTable";
import AddMovieModal from "./AddMovieModal";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movieToEdit, setMovieToEdit] = useState(null);

  // Para que la ruta solo lo tenga chisato
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.username !== "Chisato") {
      navigate("/404"); 
    }
  }, [navigate]);

  const openModal = (movie) => {
    setMovieToEdit(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMovieToEdit(null);
  };

  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const updateMovie = (updatedMovie) => {
    setMovies(
      movies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
  };

  const deleteMovie = (movieId) => {
    setMovies(movies.filter((movie) => movie.id !== movieId));
  };

  return (
    <div>
      <div className={styles.adminContainer}>
        <h1>Administrar web de peliculas</h1>
        <button
          className={styles.newMovieButton}
          onClick={() => openModal(null)}
        >
          Nueva pelicula
        </button>
        <MovieTable
          movies={movies}
          onDelete={deleteMovie}
          onEdit={openModal}
        />
      </div>
      <AddMovieModal
        isOpen={isModalOpen}
        onClose={closeModal}
        addMovie={addMovie}
        updateMovie={updateMovie}
        movieToEdit={movieToEdit}
      />
    </div>
  );
};

export default AdminPage;
