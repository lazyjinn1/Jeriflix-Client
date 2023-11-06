import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignUpView } from '../signup-view/signup-view';




export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser? storedUser:null);
  const [token, setToken] = useState(storedToken? storedToken:null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  //console.log(user);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://jeriflix.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const MoviesFromApi = data.map((movie) => ({
          ID: movie._id,
          Title: movie.Title,
          Description: movie.Description,
          ImagePath: movie.ImagePath,
          Director: {
            Name: movie.Director.Name,
            Bio: movie.Director.Bio,
            Birth: movie.Director.Birth,
            Death: movie.Director.Death
          },
          Genre: {
            Name: movie.Genre.Name,
            Description: movie.Genre.Description
          }
        }));
        setMovies(MoviesFromApi);

      })
      .catch((error) => {
        console.error('Error fetching movies: ' + error);
      });
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={
          (user, token) => {
            setUser(user)
            setToken(token)
          }}
        />
        <SignUpView />
      </>);
  }

  if (selectedMovie) {
    let similarMovies = movies.filter((simMovie) => {
      return (simMovie.Genre.Name === selectedMovie.Genre.Name && simMovie !== selectedMovie)
    })
    console.log (similarMovies);
    return (
      <>
        <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <br></br>
        <h2>Similar Movies:</h2>
        {similarMovies.map((simMovie) => (
          <MovieCard
            key={simMovie._id}
            movieData={simMovie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </>
    );
  }


  // if (movies.length === 0) {
  //   return <div>Movie list is empty!</div>;
  // }



  return (
    <div className='MovieCard-grid'>

      <button onClick={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}>Logout</button>

      {movies.map((movie) => (
        <MovieCard
          key = {movie._id}
          movieData={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}

    </div>
  );
}

