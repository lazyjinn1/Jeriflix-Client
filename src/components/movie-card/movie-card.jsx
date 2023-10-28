import PropTypes from 'prop-types'

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

MovieCard.PropTypes = {
    movieData: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.any,
            Death: PropTypes.any
        }).isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }).isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,

    onMovieClick: PropTypes.func.isRequired
};