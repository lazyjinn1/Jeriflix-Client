import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignUpView } from '../signup-view/signup-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser? storedUser:null);
  const [token, setToken] = useState(storedToken? storedToken:null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  let similarMovies = [];
  let directorMovies = []

  if (selectedMovie) {
    similarMovies = movies.filter((simMovie) => {
      return (simMovie.Genre.Name === selectedMovie.Genre.Name && simMovie.Title !== selectedMovie.Title)
    })
    directorMovies = movies.filter((dirMovie) => {
      return (dirMovie.Director.Name === selectedMovie.Director.Name && dirMovie.Title !== selectedMovie.Title)
    })
  }



  return (
    <Row className = 'justify-content-md-center'>
      {!user ? (
        <Col md = {5}>
          <h3 className = 'm-2'>Login:</h3>
            <LoginView onLoggedIn={
              (user, token) => {
                setUser(user)
                setToken(token)
              }}
            />
          <h3 className = 'm-2'>Register: </h3>
            <SignUpView />
        </Col>
      ) : selectedMovie ? (
        <Container>
          <Row className = 'justify-content-md-center'>
            <MovieView 
              movieData={selectedMovie} 
              onBackClick={() => setSelectedMovie(null)} 
            />
          </Row>
          
          <h1 className = 'm-4'>Other titles you may like:</h1>

          <Row>
            <h2 className = 'm-3'>By Genre:</h2>
            
            {similarMovies.map((simMovie) => (
              <Col className = "m-1" md = {3}>
                <MovieCard
                  key={simMovie.ID}
                  movieData={simMovie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </Row> 

          <Row>
            <h2 className = 'm-3'>By Director:</h2>
            
            {directorMovies.map((dirMovie) => (
              <Col className = "m-1" md = {3}>
                <MovieCard
                  key={dirMovie.ID}
                  movieData={dirMovie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </Row> 


        </Container>
      ) : (
        <Row className = 'justify-content-md-center'>
            <button onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}>Logout</button>

            {movies.map((movie) => (
              <Col className = "mb-5"  md = {3}>
                <MovieCard
                  key = {movie.ID}
                  movieData={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
        </Row>
      )}
    </Row>
  );
};
    