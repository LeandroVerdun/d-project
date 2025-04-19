import React, { useState } from "react";
import Navbar from "../../assets/layout/Navbar";
import MovieTable from "./MovieTable";
import AddMovieModal from "./AddMovieModal";
import styles from "./AdminPage.module.css";

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={styles.adminContainer}>
        <h1>Administrar web de peliculas</h1>
        <button className={styles.newMovieButton} onClick={openModal}>
          Nueva pelicula
        </button>
        <MovieTable />
      </div>
      <AddMovieModal isOpen={isModalOpen} onClose={closeModal} />{" "}
      {/* Paso 3: Pasar props */}
    </div>
  );
};

export default AdminPage;
