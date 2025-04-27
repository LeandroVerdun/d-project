import React, { useState, useEffect } from "react";
import styles from "./AddMovieModal.module.css";

const AddMovieModal = ({ isOpen, onClose, addMovie, updateMovie, movieToEdit }) => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    nombre: "",
    descripcion: "",
    categoria: "Accion",
    publicado: false,
  });

  useEffect(() => {
    if (movieToEdit) {
      setFormData(movieToEdit); 
    } else {
      setFormData({
        id: Date.now(),
        nombre: "",
        descripcion: "",
        categoria: "Accion",
        publicado: false,
      }); 
    }
  }, [movieToEdit]); 

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movieToEdit) {
      updateMovie(formData); 
    } else {
      addMovie(formData); 
    }
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2>{movieToEdit ? "Editar pelicula" : "Nueva pelicula"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cod">Cod:</label>
            <input
              type="text"
              id="cod"
              name="id"
              value={formData.id}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="descripcion">Descripcion:</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="categoria">Categoria:</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
            >
              <option value="Accion">Accion</option>
              <option value="Comedia">Comedia</option>
            </select>
          </div>
          <div>
            <label htmlFor="publicado">Publicado:</label>
            <input
              type="checkbox"
              id="publicado"
              name="publicado"
              checked={formData.publicado}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.buttons}>
            <button type="submit">{movieToEdit ? "Guardar cambios" : "Guardar"}</button>
            <button type="button" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
