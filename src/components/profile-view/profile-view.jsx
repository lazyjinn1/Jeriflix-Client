import { useState, useEffect} from 'react';
import { useParams } from "react-router";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MainView } from '../main-view/main-view';
import { Card } from 'react-bootstrap';

export const ProfileView = (userData, movieData) => {
    const {userID} = useParams();
    const user = userData.find((b) => b.ID === userID);
    const FavoriteMovies = movieData.filter((b) => b.ID === user.FavoriteMovies.ID)

    return (
        <Container>
            <Col>
                <Row>
                    <h3>Favorite Movies</h3>
                    {FavoriteMovies.map((FavMovies) => {
                        <Col className = "mb-5"  md = {2}>
                            <MovieCard movieData = {FavMovies}/>
                        </Col>
                    })}
                    
                        
                </Row>
            </Col>
            <Col>
                <Card>
                    <Card.Img></Card.Img>
                    <Card.Title>{userData.Username}</Card.Title>
                    <Card.Body>
                        <Card.Text>{userData.Email}</Card.Text>
                        <Card.Text>{userData.Birthday}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    )
}