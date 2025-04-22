import React, { useState } from "react";
import MovieTable from "./MovieTable";
import AddMovieModal from "./AddMovieModal";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movieToEdit, setMovieToEdit] = useState(null); // Estado para la película que se va a editar
  
  const openModal = (movie) => {
    setMovieToEdit(movie);  // Seteamos la película seleccionada para editar
    setIsModalOpen(true);   // Abrimos el modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMovieToEdit(null);  // Limpiamos la película seleccionada después de cerrar el modal
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
        <button className={styles.newMovieButton} onClick={() => openModal(null)}>
          Nueva pelicula
        </button>
        <MovieTable
          movies={movies}
          onDelete={deleteMovie}
          onEdit={openModal}  // Pasamos la función openModal a MovieTable
        />
      </div>
      <AddMovieModal
        isOpen={isModalOpen}
        onClose={closeModal}
        addMovie={addMovie}
        updateMovie={updateMovie}  // Pasamos updateMovie
        movieToEdit={movieToEdit}  // Le pasamos la película que se va a editar
      />
    </div>
  );
};

export default AdminPage;
