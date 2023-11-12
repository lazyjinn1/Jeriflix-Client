import './movie-view.scss';
import Card from 'react-bootstrap/Card';


export const MovieView = ({movieData, onBackClick}) => {
  return (
    <Card className = 'h-50 w-50'>
      <Card.Img
        src = {movieData.ImagePath}
      />
      <Card.Body>
        <Card.Title>
          <span>Title: </span> 
          <span className = 'Title'>{movieData.Title}</span>
        </Card.Title>

        <Card.Text>
          <span>Director: </span>
          <span className = 'Director'>{movieData.Director.Name}</span>
        </Card.Text>

        <Card.Text>
          <span>Genre: </span>
          <span className = 'Genre'>{movieData.Genre.Name}</span>
        </Card.Text>

        <Card.Text>
          <span>Description: </span>
          <span className = 'Description'>{movieData.Description}</span>
        </Card.Text>

        <br></br>

        <button onClick={(onBackClick)} className = "back-button">Back</button>

      </Card.Body>
      
    </Card>
  );
};