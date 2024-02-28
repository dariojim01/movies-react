//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const resp= await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key=773f77edd60f1b3fba369bcefe530f36&language=es-ES'
        );
        setMovies(resp.data.results);
      } catch (error) {
        console.error('Error giving movies: ', error);
      }
    };
    fetchMovies();

  }, []);


  return (
    <div className="App">
      <h1>Getting Movies DJ 2024</h1>
      <div className="movies">
        {movies && movies.map(movie => (

          <div key={movie.id} className="movie">
          <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          />
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
