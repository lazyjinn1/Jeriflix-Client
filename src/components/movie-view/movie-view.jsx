
import { Button, Card } from 'react-bootstrap';
import './movie-view.scss';


export const MovieView = ({movieData, onBackClick}) => {
  return (
    <Card className = 'w-50 h-100'>
      <Card.Img
        variant = "top"
        src = {movieData.ImagePath}
      />
      <Card.Body>
        <Card.Title>
          <span >Title: </span> 
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

        <Button onClick={(onBackClick)} className = "back-button">Back</Button>

      </Card.Body>
      
    </Card>
  );
};