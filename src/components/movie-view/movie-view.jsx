// import { DirectorView } from "../director-view/director-view";

// export const MovieView = ({movieData, onBackClick, onDirectorClick}) => {
export const MovieView = ({movieData, onBackClick}) => {
  return (
    <div className = "MovieView">
      <div>
        <img className = "MovieImg" src = {movieData.ImagePath} />
      </div>

      <div>
        <span>Title: </span> 
        <span className = "Title">{movieData.Title}</span>
      </div>

      <div>
        <span>Director: </span>
        <span className = "Director">{movieData.Director.Name}</span>
      </div>

      <div>
        <span>Genre: </span>
        <span className = "Genre">{movieData.Genre.Name}</span>
      </div>

      <div>
        <span>Description: </span>
        <span className = "Description">{movieData.Description}</span>
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