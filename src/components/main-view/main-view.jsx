import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";




export const MainView = () => {
  const [movies, setMovies] = useState([]);

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


  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    let similarMovies = movies.filter((simMovie) => {
      return (simMovie.Genre === selectedMovie.Genre && simMovie!== selectedMovie)
    })

    // if (similarMovies.length === 0) {
    //   return <div>No similar movies!</div>;
    // }

    console.log(similarMovies);
    
    return (
      <div>
        <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <br></br>
        <h2>Similar Movies: </h2>
        {similarMovies.map((movie) => {
          return(
            <MovieCard 
              key = {movie.ID}
              movieData = {movie}
              onMovieClick = {(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />)
        })}
      </div>
    );
  }

  if (movies.length === 0) {
    return <div>Movie list is empty!</div>;
  }

  return (
    <div class = "MovieCard-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.ID}
          movieData={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      
    </div>
  );
};
