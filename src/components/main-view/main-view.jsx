import { useState, useEffect, useCallback } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignUpView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './main-view.scss';
import LeftArrow from '../../../assets/LeftArrow.png'
import RightArrow from '../../../assets/RightArrow.png'

export const MainView = () => {
  let storedUser = localStorage.getItem('user');
  let storedToken = localStorage.getItem('token');

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]); // initially defines movies as an empty array
  const [sliderRef, setSliderRef] = useState(null); // defines sliderRef which is the container that our slider functions are used for. It is null until we define it later
  const [searchTerm, setSearchTerm] = useState(''); // defines searchTerm which is used for our searching function

  // This uses callbacks to define SliderRef and prevents it from being 'null'
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

    // variables used for our scrolling
    let isDown = false;
    let startX;
    let scrollLeft;

    // handles what to do when mouse button is clicked down
    const handleMouseDown = (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    // handles what to do when mouse leaves the app
    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    // handles what to do when mouse button is unclicked
    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    // handles what to do when cursor is moved around
    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    // Touch event handlers
    const handleTouchStart = (e) => {
      isDown = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleTouchMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      isDown = false;
    };

    // adds our eventListeners
    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('touchcancel', handleTouchEnd);
    slider.addEventListener('touchend', handleTouchEnd);
    slider.addEventListener('touchmove', handleTouchMove);
  }, [sliderRef]);

  // Function to handle right scroll. This uses the buttons.
  const scrollRight = () => {
    const slider = sliderRef;
    console.log(slider);
    if (slider) {
      slider.scrollBy({ left: 1000, behavior: 'smooth' });
    }
  };

  // Function to handle left scroll. This uses the buttons.
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
    // This grabs all of the movies from our backend and adds them onto our 'movies' variable.
    // fetch('http://localhost:8080/movies', {
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


  

  // uses searchTerm to filter the movies array.
  const filteredMovies = movies.filter(movie => {
    if (!searchTerm) {
      return ;
    }
    if (searchTerm) {
      return (
        (movie.Title.toLowerCase().includes(searchTerm.toLowerCase()))
        ||
        (movie.Genre.Name.toLowerCase().includes(searchTerm.toLowerCase()))
        ||
        (movie.Director.Name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
  });
  // console.log(filteredMovies);


  return (
    // This allows us to make this whole thing a one-pager
    <BrowserRouter>
      {/* This is our nav bar which shows at the top of every page */}
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        movies={movies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredMovies={filteredMovies}
      />
      {/* Sign Up */}
      <Row className='justify-content-md-center mt-1'>
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
          {/* Log-In */}
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
          {/* Single Movie View */}
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

          {/* Main Page */}
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
                      {/* Direction Arrow Left */}
                      <Col md={1} className = 'directionArrowLocation'>
                        <Button className='directionArrow' variant='contained' onClick={scrollLeft} style={{ float: 'left' }}>
                          <img className='img-fluid' src={LeftArrow} />
                        </Button>
                      </Col>
                      {/* The main movie list which shows ALL the movies */}
                      <Col md={10}>
                      <h2>All Movies:</h2>
                        <Row className='flex-nowrap m-0' id='movielist' ref={handleSliderRef}>

                          {movies.map((movie) => (

                            <Col className='my-3' md={3} key={movie.ID}>
                              <MovieCard
                                movieData={movie}
                              />

                            </Col>
                          ))}
                        </Row>
                        <h4 className='mt-1' >Search Results: ({searchTerm})</h4>
                        <Row className='flex m-0' id='movielist'>
                          
                          {filteredMovies.map((movie) => (

                            <Col className='my-1 mx-3' md={2} key={movie.ID}>
                              <MovieCard
                                movieData={movie}
                              />

                            </Col>
                          ))}
                        </Row>
                      </Col>

                      {/* Direction Arrow Right */}
                      <Col md={1} className = 'directionArrowLocation'>
                        <Button className='directionArrow' variant='contained' onClick={scrollRight} style={{ float: 'right' }}>
                          <img className='img-fluid' src={RightArrow} />
                        </Button>
                      </Col>
                    </Row>

                  </Container>
                )}
              </Container>
            }
          />

          {/* User Profile */}
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