import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from "react-router-dom";
import { Button, Card, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './movie-view.scss';


export const MovieView = ({ user, setUser, token, movieData }) => {
  const { movieID } = useParams(); // useParams allows us to use the URL (which is how our backend is setup for movieView)
  const [isFavorite, setIsFavorite] = useState(false); // defined by whether the movie is in the user's FavoriteMovies list or not.

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // makes sure that we have our user stored and is parsed
    setUser(storedUser);
  }, []);

  const movie = movieData.find((b) => b.ID === movieID); //defines all movies' IDs

  // Filters based on movies with the same Genres
  let similarMovies = movieData.filter((simMovie) => {
    return (simMovie.Genre.Name === movie.Genre.Name && simMovie.Title !== movie.Title)
  })
  // Filters based on movies with the same Directors
  let directorMovies = movieData.filter((dirMovie) => {
    return (dirMovie.Director.Name === movie.Director.Name && dirMovie.Title !== movie.Title)
  })
  // console.log(movie);
  // console.log(similarMovies);
  // console.log(directorMovies);

  useEffect(() => {
    // Changes the property of a movie based on if they are in the Favorites List or not
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movieID)) {
      setIsFavorite(true);
    }
    else {
      setIsFavorite(false);
    }
  }, [user]);

  useEffect(() => {
    // Ensure that user and user's favorite movies are not undefined
    if (user && user.FavoriteMovies) {
      setIsFavorite(user.FavoriteMovies.includes(movieID));
    }
  }, [user, movieID]);

  //Function for adding a movie to their favorites
  const addToFavorites = async () => {
    await fetch(`https://jeriflix.onrender.com/users/${user.Username}/favorites/${movieID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    )
    await fetch(`https://jeriflix.onrender.com/users/${user.Username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Error adding movie to Favorites");
      }
    }).then((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsFavorite(true);
        console.log(user);
      }
    }).catch((error) => {
      alert(error);
    });
  }

  //Function for removing a movie from their favorites
  const removeFromFavorites = async () => {
    await fetch(`https://jeriflix.onrender.com/users/${user.Username}/favorites/${movieID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    )
    await fetch(`https://jeriflix.onrender.com/users/${user.Username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Error adding movie to Favorites");
      }
    }).then((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsFavorite(false);
        console.log(user);
      }
    }).catch((error) => {
      alert(error);
    });
  };


  return (
    <Container className='align-items-center h-100 mt-2'>
      <Row>
        {/* This is the big movie poster */}
        <Col md={5} className='m-3'>
          <Card.Img
            variant="top"
            src={movie.ImagePath}
            id='moviePoster'>
          </Card.Img>
        </Col>

        {/* This shows the movie's details in a card format (uses React-Bootstrap) */}
        <Col className='w-40 m-3' md={6}>
          <Card>
            <Card.Body className='p-2 h-50 text-center align-middle movieDetails'>

              <Card.Title>
                <h1>{movie.Title}</h1>
              </Card.Title>

              <Card.Text>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
              </Card.Text>

              <Card.Text>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
              </Card.Text>

              <Card.Text>
                <span>Description: </span>
                <span>{movie.Description}</span>
              </Card.Text>

              {/* sends user back to main page */}
              <Link to={`/`}>
                <Button
                  className='close-open-btn'
                  onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}>
                  Back
                </Button>
              </Link>

              {/* Changes based on the current status (isFavorite or isNotFavorite) */}
              <Card.Body>
                {!isFavorite ? (
                  <Button
                    className='close-open-btn'
                    onClick={() => { addToFavorites() }}>
                    Add to Favorites
                  </Button>
                ) : (
                  <Button
                    className='close-open-btn'
                    onClick={() => { removeFromFavorites() }}>
                    Remove from Favorites
                  </Button>
                )}
              </Card.Body>

            </Card.Body>
          </Card>

          {/* Similar Movies based on Genre or Director */}
          <h3 className="m-2"> Similar Movies: </h3>
          <Row>
            {/* based on Genre */}
            <h4 className="mx-3">Other {movie.Genre.Name} movies: </h4>
            {similarMovies.length > 0 ? (
              similarMovies.map((simMovie) => (
                <Col className="mb-3" md={3} key={simMovie.ID}>
                  <MovieCard
                    movieData={simMovie}
                  />
                </Col>
              ))
            ) : (
              // If no movies are found for similarMovies then this is returned
              <p className="mx-3">No other {movie.Genre.Name} movies found.</p>
            )}
            {/* based on Director */}
            <h4 className="mx-3">Other movies by {movie.Director.Name}:</h4>
            {directorMovies.length > 0 ? (
              directorMovies.map((dirMovie) => (
                <Col className="mb-3" md={3} key={dirMovie.ID}>
                  <MovieCard
                    movieData={dirMovie}
                  />
                </Col>
              ))
            ) : (
              // If no movies are found for directorMovies then this is returned
              <p className="mx-3">No other movies by {movie.Director.Name} found.</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};