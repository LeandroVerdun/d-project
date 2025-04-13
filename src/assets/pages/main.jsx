// src/assets/pages/MainPage.jsx
import React from 'react';
import { Navbar } from '../layout/navbar';
import { MovieCarousel } from '../../component/MovieCarousel';
import { MovieCardWithSubcards } from '../../component/MovieCardWithSubcards';
import '../../css/MainPage.css';

export const MainPage = () => {
  return (
    <>
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
        <MovieCarousel />
        <MovieCardWithSubcards />
      </div>
    </>
  );
};
