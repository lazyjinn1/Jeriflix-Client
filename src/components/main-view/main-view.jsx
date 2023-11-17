import { useState, useEffect} from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignUpView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';




export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

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

  return (
    <BrowserRouter>
      <NavigationBar 
        user = {user}
        onLoggedOut = {() => {
          setUser(null);
        }}
      />
      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/signup'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <SignUpView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path='/login'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={
                      (user, token) => {
                        setUser(user)
                        setToken(token)
                      }}
                    />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path='/movies/:movieID'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Row className='gx-0' key = {movies.ID}>
                    <MovieView
                      
                      movieData={movies}
                    />
                  </Row>
                )}
              </>
            }
          />

          <Route
            path='/'
            element={
              <Container>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Container className='container-fluid py-2'>
                    <Row className='flex-row flex-nowrap'>
                      {movies.map((movie) => (
                        <Col className='mb-5' md={3} key={movie.ID}>
                          <MovieCard
                            movieData={movie}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Container>
                )}
              </Container>
            }
          />

          <Route 
            path = '/profile'
            element = {
              <Container>
                {!user ? (
                  <Navigate to = '/login' replace />
                ) : (
                  <Col>
                    <Row>
                      <ProfileView 
                        user = {user}
                        setUser = {setUser}
                        token = {token}
                        movieData = {movies}
                      />
                    </Row>
                  </Col>
                  
                )}
              </Container>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};