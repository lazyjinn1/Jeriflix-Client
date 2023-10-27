// import { DirectorView } from "../director-view/director-view";

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
        <span class = "Director">{movieData.Director}</span>
      </div>

      <div>
        <span>Genre: </span>
        <span class = "Genre">{movieData.Genre}</span>
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

      <br></br>
      <br></br>

      <button onClick={(onBackClick)}>Back</button>

    </div>
  );
};
