import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";




export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState([null]);

  useEffect(() => {
    fetch('https://jeriflix.onrender.com/movies')
      .then((response) => response.json())
      .then((data) => {
        const MoviesFromApi = data.map((movie) => {
          return {
            ID: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            ImagePath: movie.ImagePath,
            Director: movie.Director.Name,
            Genre: movie.Genre.Name
          };
        });
        setMovies(MoviesFromApi);
      });
  }, []);

  if(!user){
    return <LoginView />;
  }
  
  if (selectedMovie) {
    let similarMovies = movies.filter((simMovie) => {
      return (simMovie.Genre === selectedMovie.Genre && simMovie!== selectedMovie)
    })

    console.log(similarMovies);
    
    return (
      <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>Movie list is empty!</div>;
  }

  

  return (
    <div class = "MovieCard-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movieData={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      
    </div>
  );
};
