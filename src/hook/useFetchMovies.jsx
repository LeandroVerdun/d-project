
import { useEffect, useState } from 'react';

export const useFetchMovies = (searchTerm = 'a', limit = 5) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = 'd511530c';

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie&page=1`);
        const data = await res.json();

        if (data.Response === 'True') {
          const shuffled = data.Search.sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, limit);

          const detailedMovies = await Promise.all(
            selected.map(async (movie) => {
              const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&plot=full`);
              const fullDetails = await res.json();
              return fullDetails;
            })
          );

          setMovies(detailedMovies);
        } else {
          setMovies([]); 
        }
      } catch (err) {
        console.error('Error fetching movies:', err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm, limit]); 

  return { movies, loading };
};
