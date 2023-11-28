import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from "react-router-dom";
import { Button, Card, Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import './movie-view.scss';


export const MovieView = ({ user, setUser, token, movieData }) => {

  user = JSON.parse(localStorage.getItem("user"));
  const { movieID } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const movie = movieData.find((b) => b.ID === movieID);

  let similarMovies = movieData.filter((simMovie) => {
    return (simMovie.Genre.Name === movie.Genre.Name && simMovie.Title !== movie.Title)
  })
  let directorMovies = movieData.filter((dirMovie) => {
    return (dirMovie.Director.Name === movie.Director.Name && dirMovie.Title !== movie.Title)
  })
  // console.log(movie);
  // console.log(similarMovies);
  // console.log(directorMovies);

  useEffect(() => {
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movieID)) {
      setIsFavorite(true);
    }
    else {
      setIsFavorite(false);
    }
  }, [user]);

  console.log(user);

  const addToFavorites = () => {
    fetch(`https://jeriflix.onrender.com/users/${user.Username}/favorites/${movieID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    )
    fetch(`https://jeriflix.onrender.com/users/${user.Username}`, {
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
        alert(`${movie.Title} added to Favorites`);
        window.location.reload();
      }
    }).catch((error) => {
      alert(error);
    });
  }

  const removeFromFavorites = () => {
    fetch(`https://jeriflix.onrender.com/users/${user.Username}/favorites/${movieID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    )
    fetch(`https://jeriflix.onrender.com/users/${user.Username}`, {
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
        alert(`${movie.Title} removed from Favorites`);
        window.location.reload();
      }
    }).catch((error) => {
      alert(error);
    });
  };


  return (
    <Container className='align-items-center h-100 m-5'>
      <Row>
        <Col md={4} className='m-3'>
          <Card.Img
            variant="top"
            src={movie.ImagePath}
            id='moviePoster'>
          </Card.Img>
        </Col>
        <Col className='w-40 m-3' md={6}>
          <Card>
            <Card.Body className='p-2 h-50 text-center align-middle'>

              <Card.Title>
                <span >Title: </span>
                <span className='Title'>{movie.Title}</span>
              </Card.Title>

              <Card.Text>
                <span>Director: </span>
                <span className='Director'>{movie.Director.Name}</span>
              </Card.Text>

              <Card.Text>
                <span>Genre: </span>
                <span className='Genre'>{movie.Genre.Name}</span>
              </Card.Text>

              <Card.Text>
                <span>Description: </span>
                <span className='Description'>{movie.Description}</span>
              </Card.Text>

              <Link to={`/`}>
                <Button
                  className='close-open-btn'
                  onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); }}>
                  Back
                </Button>
              </Link>

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
        </Col>
      </Row>


      <h2 className="m-2"> Titles you may like: </h2>
      <Row>
        <h3 className="m-3">By Genre:</h3>
        {similarMovies.map((simMovie) => (
          <Col className="mb-5" md={2} key={simMovie.ID}>
            <MovieCard
              movieData={simMovie}
            />
          </Col>
        ))}
      </Row>

      <Row>
        <h3 className="m-2">By Director:</h3>
        {directorMovies.map((dirMovie) => (
          <Col className="mb-5" md={2} key={dirMovie.ID}>
            <MovieCard
              movieData={dirMovie}
            />
          </Col>
        ))}
      </Row>

    </Container>
  );
};