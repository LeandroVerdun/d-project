import React, { useState } from 'react';
import { Navbar } from '../assets/layout/navbar';
import { useFetchMovies } from '../hook/useFetchMovies';
import { SearchMovie } from './SearchMovie';

const NavbarHook = () => {
  const [searchTerm, setSearchTerm] = useState('a'); // término inicial
  const { movies, loading } = useFetchMovies(searchTerm, 10);

  return (
    <div>
      <Navbar onSearch={setSearchTerm} />
      {loading ? (
        <p className="text-center mt-4">Cargando películas...</p>
      ) : (
        <SearchMovie movies={movies} />
      )}
    </div>
  );
};

export default NavbarHook;
