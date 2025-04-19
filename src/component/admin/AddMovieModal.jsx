import React from "react";
import styles from "./AddMovieModal.module.css"; // Si usas CSS Modules

const AddMovieModal = ({ isOpen, onClose }) => {
  // Recibe isOpen y onClose como props
  if (!isOpen) {
    return null; // No renderiza nada si isOpen es false
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close}>&times;</span>
        <h2>Nueva pelicula</h2>
        <form>
          <div>
            <label htmlFor="cod">Cod:</label>
            <input type="text" id="cod" name="cod" />
          </div>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" />
          </div>
          <div>
            <label htmlFor="descripcion">Descripcion:</label>
            <textarea id="descripcion" name="descripcion"></textarea>
          </div>
          <div>
            <label htmlFor="categoria">Categoria:</label>
            <select id="categoria" name="categoria">
              <option value="Accion">Accion</option>
              <option value="Comedia">Comedia</option>
              {/* ... más opciones ... */}
            </select>
          </div>
          <div>
            <label htmlFor="publicado">Publicado:</label>
            <input type="checkbox" id="publicado" name="publicado" />
          </div>
          <div className={styles.buttons}>
            <button type="submit">Save Changes</button>
            <button type="button">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
