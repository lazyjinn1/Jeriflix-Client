export const MovieCard = ({movieData, onMovieClick}) => {
    return (
            <div>
                <button class = "MovieCard" onClick= {() => {
                        onMovieClick(movieData);
                    }}>
                    {movieData.Title}
                </button>

                <div class = "MovieCard-Preview-Container">
                    <img class = "MovieCard-Preview" src = {movieData.ImagePath} />
                </div>
            </div>
    );
};