import { useState, useEffect, useCallback } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignUpView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LeftArrow from '../../../assets/LeftArrow.png'
import RightArrow from '../../../assets/RightArrow.png'

export const MainView = () => {
  let storedUser = localStorage.getItem('user');
  let storedToken = localStorage.getItem('token');

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [sliderRef, setSliderRef] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSliderRef = useCallback((e) => {
    if (e !== null) {
      setSliderRef(e);
    }
  }, []);

  useEffect(() => {
    const slider = sliderRef;

    if (!slider) {
      return;
    }

    let isDown = false;
    let startX;
    let scrollLeft;

    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
    };
  }, [sliderRef]);

  // Function to handle right scroll
  const scrollRight = () => {
    const slider = sliderRef;
    console.log(slider);
    if (slider) {
      slider.scrollBy({ left: 1000, behavior: 'smooth' });
    }
  };

  // Function to handle left scroll
  const scrollLeft = () => {
    const slider = sliderRef;
    console.log(slider);
    if (slider) {
      slider.scrollBy({ left: -1000, behavior: 'smooth' });
    }
  };



  useEffect(() => {
    if (!token) {
      return;
    }
    // fetch('http://localhost:8080/movies', {
    //   headers: { Authorization: `Bearer ${token}` },
    // })
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


  const handleSearchMovie = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredMovies = movies.filter(movie => {
    if (!searchTerm) {
      return;
    }
    if (searchTerm) {
      return movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    }
  });
  console.log(filteredMovies);


  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className='justify-content-md-center mt-5'>
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
                  <Row className='gx-0' key={movies.ID}>
                    <MovieView
                      user={user}
                      setUser={setUser}
                      token={token}
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

                  <Container className='mw-100 mh-100 overflow-hidden' >
                    <Row>
                      <Col md={2}>
                        <Button className='directionArrow' variant='contained' onClick={scrollLeft} style={{ float: 'left' }}>
                          <img className='img-fluid h-50 w-50' src={LeftArrow} />
                        </Button>
                      </Col>

                      <Col md={8}>
                        <Row className='flex-nowrap m-0' id='movielist' ref={handleSliderRef}>

                          {movies.map((movie) => (

                            <Col className='mb-3' md={4} key={movie.ID}>
                              <h2 className='fixed-top text-center justify-center pe-none movieCard'> All Movies</h2>
                              <MovieCard
                                movieData={movie}
                              />

                            </Col>
                          ))}
                        </Row>
                      </Col>

                      <Col md={2}>
                        <Button className='directionArrow' variant='contained' onClick={scrollRight} style={{ float: 'right' }}>
                          <img className='img-fluid h-50 w-50' src={RightArrow} />
                        </Button>
                      </Col>
                    </Row>
                    <Row>
                      <Form>
                        <Form.Group>
                          <Form.Label>Search</Form.Label>
                          <Form.Control type="text" placeholder= "Search movies..." onChange={handleSearchMovie}></Form.Control>
                        </Form.Group>
                      </Form>
                      <Row className='flex-nowrap m-0' id='movielist'>
                          {filteredMovies.map((movie) => (
                            <Col md={1} key={movie.ID}>
                              <MovieCard
                                movieData={movie}
                              />
                            </Col>
                          ))}
                      </Row>
                    </Row>


                  </Container>
                )}
              </Container>
            }
          />

          <Route
            path='/profile'
            element={
              <Container>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <Col>
                    <Row>
                      <ProfileView
                        user={user}
                        setUser={setUser}
                        token={token}
                        movieData={movies}
                      />
                    </Row>
                  </Col>

                )}
              </Container>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter >
  );
};