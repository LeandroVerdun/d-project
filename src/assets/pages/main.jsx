import React from 'react';
import { Navbar } from '../layout/navbar';
import { MovieCarousel } from '../../component/MovieCarousel';
import { MovieCardWithSubcards } from '../../component/MovieCardWithSubcards';
import MovieCard from '../../component/SaleCard';
import VerticalTableRow from '../../component/MovieList';
import '../../css/MainPage.css';

export const MainPage = () => {
  return (
    <>
      <Navbar />
      <div
        className="d-flex flex-column align-items-center"
        style={{
          height: '100vh',
          width: '100vw',
          overflowY: 'auto',
        }}
      >
        <MovieCarousel />
        <MovieCardWithSubcards />
        <MovieCard />
        <VerticalTableRow />
      </div>
    </>
  );
};
