import propTypes from 'prop-types';
import { useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

export const MovieCard = ({ movieData }) => {
    const [isHovered, setIsHovered] = useState(false); // defines a state of hovered or not hovered. Defaults unhovered

    return (
        <Container>

            <Card
                className='h-100 gx-0 mt-1 movie-card'
                onMouseEnter={() => setIsHovered(true)} // defines when hovered is true or false (when mouse enters or leaves)
                onMouseLeave={() => setIsHovered(false)}
            >

                {/* encodeURIComponent allows random strings like ID to be read */}
                <Link to={`/movies/${encodeURIComponent(movieData.ID)}`}>
                    <Button
                        className='p-0 gx-0 movieCard'
                        variant="link"
                        onClick={() => {
                            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                        }}>

                        {/* This is our full picture */}
                        <div className='image-container'>
                            <Card.Img src={movieData.ImagePath} />
                            {/* when hovered, the title is shown */}
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

// Movie Proptypes!
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