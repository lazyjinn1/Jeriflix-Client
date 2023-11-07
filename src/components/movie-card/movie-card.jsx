import propTypes from 'prop-types'

export const MovieCard = ({movieData, onMovieClick}) => {
    return (
            <div>
                <button className = 'MovieCard' onClick= {() => {
                        onMovieClick(movieData);
                    }}>
                    {movieData.Title}
                </button>

                <div className = 'MovieCard-Preview-Container'>
                    <img className = 'MovieCard-Preview' src = {movieData.ImagePath} />
                </div>
            </div>
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