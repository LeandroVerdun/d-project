import React from "react";
import styles from "./MovieTable.module.css"; // Si usas CSS Modules

const MovieTable = () => {
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
        {/* Aquí iría el mapeo de los datos de las películas */}
        <tr>
          <td>Star wars-IV</td>
          <td>Clasicas</td>
          <td>descripcion</td>
          <td>☑</td>
          <td>
            <button>Borrar</button>
            <button>Editar</button>
            <button>Destacar</button>
          </td>
        </tr>
        <tr>
          <td>Karate kid</td>
          <td>Clasicas</td>
          <td>descripcion.....</td>
          <td></td>
          <td>
            <button>Borrar</button>
            <button>Editar</button>
            <button>Destacar</button>
          </td>
        </tr>
        <tr>
          <td>Rocky</td>
          <td>Clasicas</td>
          <td>descripcion.....</td>
          <td>☑</td>
          <td>
            <button>Borrar</button>
            <button>Editar</button>
            <button>Destacar</button>
          </td>
        </tr>
        <tr>
          <td>Volver al futuro</td>
          <td>Clasicas</td>
          <td>descripcion......</td>
          <td></td>
          <td>
            <button>Borrar</button>
            <button>Editar</button>
            <button>Destacar</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MovieTable;
