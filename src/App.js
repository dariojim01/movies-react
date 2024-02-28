//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectGener, setSelectGener] = useState('');
  const [genres, setGenres] = useState ([]);

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

    axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=773f77edd60f1b3fba369bcefe530f36&language=es-ES'
      ).then(resp =>{
        setGenres(resp.data.genres);
       //console.log(genres);
      })
      .catch(error => {
        console.error('Error give genres: ', error);
      });

    
  }, []);

  const changeGenre = (event) => {
    setSelectGener(event.target.value)
  };


  return (
    <div className="App">
      <h1>Getting Movies DJ 2024</h1>
      <div className="filters">
        <label htmlFor="genre">Escoger Género </label>
        <select id="genre" value={selectGener} onChange={changeGenre}>
        
          {genres && genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
     
      <div className="movies">
        {movies.filter(movie => !selectGener|| movie.genre_ids.includes(parseInt(selectGener)) ).map(movie => (

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
