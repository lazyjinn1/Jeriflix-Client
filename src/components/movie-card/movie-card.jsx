import propTypes from 'prop-types';
import { Button, Card, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export const MovieCard = ({ movieData }) => {
    return (
        <Container>

            <Card className='h-100 gx-0 mt-1'>

                <Link to={`/movies/${encodeURIComponent(movieData.ID)}`}>
                    <Button
                        className='p-0 gx-0'
                        variant="link"

                        onClick={() => {
                            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
                        }}>
                        <Card.Img src={movieData.ImagePath} />
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