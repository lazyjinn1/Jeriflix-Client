// import { DirectorView } from "../director-view/director-view";
import PropTypes from "prop-types"

// export const MovieView = ({movieData, onBackClick, onDirectorClick}) => {
export const MovieView = ({movieData, onBackClick}) => {
  return (
    <div class = "MovieView">
      <div>
        <img class = "MovieImg" src = {movieData.ImagePath} />
      </div>

      <div>
        <span>Title: </span> 
        <span class = "Title">{movieData.Title}</span>
      </div>

      <div>
        <span>Director: </span>
        <span class = "Director">{movieData.Director.Name}</span>
      </div>

      <div>
        <span>Genre: </span>
        <span class = "Genre">{movieData.Genre.Name}</span>
      </div>

      <div>
        <span>Description: </span>
        <span class = "Description">{movieData.Description}</span>
      </div>

      <br></br>

      {/* <button onClick={() => {
            DirectorView(movieData);
          }}>
          See more from this director:
      </button> */}
      
      <button> See more from this director:</button>
      <button>Movies like this:</button> 

      <br></br>
      <br></br>

      <button onClick={(onBackClick)}>Back</button>

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
          Birth: PropTypes.instanceOf(Date),
          Death: PropTypes.instanceOf(Date)
      }).isRequired,
      Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Description: PropTypes.string.isRequired
      }).isRequired,
      ImagePath: PropTypes.string.isRequired
  }).isRequired,

  onBackClick: PropTypes.func.isRequired
};