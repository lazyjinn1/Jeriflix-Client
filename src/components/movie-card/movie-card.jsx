import propTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import './movie-card.scss';

export const MovieCard = ({movieData, onMovieClick}) => {
    return (
            <Card className = "h-100 p-0 gx-0">
                <Button 
                    className = 'p-0 m-0'
                    onClick={() => onMovieClick(movieData)} 
                    variant="link">
                    <Card.Img src = {movieData.ImagePath} />
                </Button>
                
                <Card.Body>
                    <Card.Title>{movieData.Title}</Card.Title>
                    <Card.Text>Director: {movieData.Director.Name}</Card.Text>
                    <Card.Text>Genre: {movieData.Genre.Name}</Card.Text>
                    <Card.Text>Description: {movieData.Description}</Card.Text>
                </Card.Body>

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