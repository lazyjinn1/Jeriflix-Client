import propTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export const MovieCard = ({movieData}) => {
    return (
            <Card className = 'h-100 p-0 gx-0 text-center'>
                
                <Link to = {`/movies/${encodeURIComponent(movieData.ID)}`}>
                    <Button 
                        className = 'p-0 gx-0'
                        variant="link"
                        onClick={() => {
                            window.scrollTo({top: 125, left: 0, behavior: 'smooth'});
                        }}>
                        <Card.Img src = {movieData.ImagePath} />
                    </Button>
                </Link>
                <Card.Title className = 'justify-content-center'>{movieData.Title}</Card.Title>
                <Card.Body> 
                    <Card.Text>Director: {movieData.Director.Name}</Card.Text>
                    <Card.Text>Genre: {movieData.Genre.Name}</Card.Text>
                    <Card.Text>Description: {movieData.Description}</Card.Text>

                    <Button
                        onClick={() => addToFavorites(movieData)}>
                        Add to favorites
                    </Button>
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

};