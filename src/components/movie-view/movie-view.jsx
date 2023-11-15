import { useParams } from "react-router";
import { MovieCard } from '../movie-card/movie-card';
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './movie-view.scss';


export const MovieView = ({movieData}) => {
  const {movieID} = useParams();

  const movie = movieData.find((b) => b.ID === movieID);

  let similarMovies = movieData.filter((simMovie) => {
    return (simMovie.Genre.Name === movie.Genre.Name && simMovie.Title !== movie.Title)
  })
  let directorMovies = movieData.filter((dirMovie) => {
    return (dirMovie.Director.Name === movie.Director.Name && dirMovie.Title !== movie.Title)
  })
  console.log(movie);
  console.log(similarMovies);
  console.log(directorMovies);
  return (
    <Container className = 'align-items-center h-100 m-5'>
      <Row>
        <Col md = {4} className = 'm-3'>
          <Card.Img
            variant = "top"
            src = {movie.ImagePath}
            id = 'moviePoster'>
          </Card.Img>
        </Col>
        <Col className = 'w-40 m-3' md = {6}>
          <Card>
            <Card.Body className = 'p-2 h-50 text-center align-middle'>
              
              <Card.Title>
                <span >Title: </span> 
                <span className = 'Title'>{movie.Title}</span>
              </Card.Title>

              <Card.Text>
                <span>Director: </span>
                <span className = 'Director'>{movie.Director.Name}</span>
              </Card.Text>

              <Card.Text>
                <span>Genre: </span>
                <span className = 'Genre'>{movie.Genre.Name}</span>
              </Card.Text>

              <Card.Text>
                <span>Description: </span>
                <span className = 'Description'>{movie.Description}</span>
              </Card.Text>

              <Link to={`/`}>
                
                <button 
                  className="back-button"
                  onClick={() => { window.scrollTo({top: 0, left: 0, behavior: 'smooth'});  }}>
                  Back
                </button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
        
        
      <h2 className="m-2"> Titles you may like: </h2>
      <Row>
        <h3 className="m-3">By Genre:</h3>
        {similarMovies.map((simMovie) => (
          <Col className = "mb-5"  md = {2}>
            <MovieCard
              key = {simMovie.ID}
              movieData={simMovie}
            />
          </Col>
        ))}
      </Row>
      
      <Row>
        <h3 className="m-2">By Director:</h3>
        {directorMovies.map((dirMovie) => (
          <Col className = "mb-5"  md = {2}>
            <MovieCard
              key = {dirMovie.ID}
              movieData={dirMovie}
            />
          </Col>
        ))}
      </Row>

    </Container>
  );
};