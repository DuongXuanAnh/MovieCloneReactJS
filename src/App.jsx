import { useState, useEffect } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import MovieList from './components/MovieList';

function App() {

  const [movie, setMovie] = useState([]);
  const [movieTopRated, setMovieTopRated] = useState([]);

  useEffect(() => { 

    const fetchMovie = async () => {


      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

      const url_movie = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
      const url_moiveTopRated = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';


      const [res_movie, res_movieTopRated] = await Promise.all([
        fetch(url_movie, options),
        fetch(url_moiveTopRated, options)
      ]);

      const data_movie = await res_movie.json();
      const data_movieTopRated = await res_movieTopRated.json();

      setMovie(data_movie.results);
      setMovieTopRated(data_movieTopRated.results);
    }

    fetchMovie();

  }, []);

  return (
    <>
      <div className='bg-black pb-10'>
        <Header />
        <Banner />
        <MovieList title={"Trending"} data={movie} />
        <MovieList title={"Awarded"} data={movieTopRated} />
      </div>
    </>
  )
}

export default App
