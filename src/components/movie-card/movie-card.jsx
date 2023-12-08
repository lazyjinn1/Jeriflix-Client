import propTypes from 'prop-types';
import { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import './movie-card.scss';

export const MovieCard = ({ movieData }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Container>

            <Card
                className='h-100 gx-0 mt-1 movie-card'
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >

                <Link to={`/movies/${encodeURIComponent(movieData.ID)}`}>
                    <Button
                        className='p-0 gx-0 movieCard'
                        variant="link"
                        onClick={() => {
                            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                        }}>
                        <div className='image-container'>

                            <Card.Img src={movieData.ImagePath} />
                            {isHovered && <div className="overlay">
                                <div className="title">{movieData.Title}</div>
                            </div>}
                        </div>

                    </Button>
                </Link>
            </Card>
        </Container>

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