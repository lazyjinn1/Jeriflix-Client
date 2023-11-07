import propTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({movieData, onMovieClick}) => {
    return (
            <Card>
                <Card.Img variant = "top" src = {movieData.ImagePath} />
                <Card.Body>
                    <Card.Title>{movieData.Title}</Card.Title>
                    <Card.Text>{movieData.Director.Name}</Card.Text>
                    <Card.Text>{movieData.Genre.Name}</Card.Text>
                    <Card.Text>{movieData.Description}</Card.Text>

                    <Button onClick={() => onMovieClick(movieData)} variant="link">
                        Open
                    </Button>
                </Card.Body>

                <div className = 'MovieCard-Preview-Container'>
                    <img className = 'MovieCard-Preview' src = {movieData.ImagePath} />
                </div>
            </Card>
    );
};

MovieCard.propTypes = {
    movieData: propTypes.shape({
        Title: propTypes.string.isRequired,
        Description: propTypes.string.isRequired,
        Director: propTypes.shape({
            Name: propTypes.string.isRequired,
            Bio: propTypes.string.isRequired,
            Birth: propTypes.any,
            Death: propTypes.any
        }).isRequired,
        Genre: propTypes.shape({
            Name: propTypes.string.isRequired,
            Description: propTypes.string.isRequired
        }).isRequired,
        ImagePath: propTypes.string.isRequired
    }).isRequired,

    onMovieClick: propTypes.func.isRequired
};