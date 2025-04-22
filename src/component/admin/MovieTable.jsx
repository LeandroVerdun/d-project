import React from "react";
import styles from "./MovieTable.module.css";

const MovieTable = ({ movies, onDelete, onEdit }) => {
  return (
    <table className={styles.movieTable}>
      <thead>
        <tr>
          <th>Pelicula</th>
          <th>Categoria</th>
          <th>Description</th>
          <th>Publicado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.id}>
            <td>{movie.nombre}</td>
            <td>{movie.categoria}</td>
            <td>{movie.descripcion}</td>
            <td>{movie.publicado ? "☑" : "☐"}</td>
            <td>
              <button onClick={() => onDelete(movie.id)}>Borrar</button>
              <button onClick={() => onEdit(movie)}>Editar</button>
              <button>Destacar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
