
export const DirectorView = ({movieData, onBackClick}) => {
    return (
      <div class = "directorView">  
        <div>
            <span class = "Director-Name">{movieData.Director.Name}</span>
        </div>

        <div>
            <span>Birth Year:  </span>
            <span class = "Birth">{movieData.Director.Birth}</span>
        </div>

        <div>
            <span>Death Year:  </span>
            <span class = "Death">{movieData.Director.Death}</span>
        </div>
  
        <div>
            <span>Biography: </span>
            <span class = "Biography">{movieData.Director.Bio}</span>
        </div>
  
        <br></br>
  
        <button>Movies by {movieData.Director.Name}:</button> 
  
        <br></br>
        <br></br>
  
        <button onClick={(onBackClick)}>Back</button>
  
      </div>
    );
  };