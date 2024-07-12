import { useState, useEffect } from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import MovieList from './components/MovieList';
import MovieSearch from './components/MovieSearch';
import { MovieProvider } from "./context/MovieProvider";

function App() {

  const [movie, setMovie] = useState([]);
  const [movieTopRated, setMovieTopRated] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (value) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    if (value === "") return setSearchData([]);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchData(data.results);
    } catch (error) {
      console.log(error);
    }
  };

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
       <MovieProvider>
        <div className="h-full bg-black text-white min-h-screen pb-10 relative">
          <Header onSearch={handleSearch} />
          <Banner />
          {searchData.length === 0 && (
            <MovieList title="Trending" data={movie.slice(0, 10)} />
          )}
          {searchData.length === 0 && (
            <MovieList title="Awarded" data={movieTopRated.slice(0, 10)} />
          )}

          {searchData.length > 0 && <MovieSearch data={searchData} />}
        </div>
      </MovieProvider>
    </>
  )
}

export default App
