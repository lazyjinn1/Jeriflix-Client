import { MovieCard } from '../movie-card/movie-card'
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';


export const ProfileView = ({ user, setUser, token, movieData }) => {

    user = JSON.parse(localStorage.getItem("user"));

    const [username, setUsername] = useState(user.Username);
    const [profilePicture, setProfilePicture] = useState(user.ProfilePicture);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const fixedBirthday = new Date(birthday).toLocaleDateString();
    
    let FavoriteMovies = user.FavoriteMovies ? movieData.filter((movie) => user.FavoriteMovies.includes(movie.ID)) : [];
    // console.log(FavoriteMovies);
    // console.log(user);
    // console.log(fixedUser);

    let handleUpdate = (event) => {
        event.preventDefault();

        let data = new FormData();
        
        data.append('Username', username);
        data.append('Email', email);
        data.append('Birthday', birthday);
        data.append('ProfilePicture', profilePicture);

        console.log(username);
        console.log(profilePicture);
        console.log(email);
        console.log(birthday);

        // fetch(`http://localhost:8080/users/${username}`, {
        fetch(`https://jeriflix.onrender.com/users/${username}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                console.log(response);
                return response.json();

            } else {
                return response.text();
            }
        }).then((data) => {
            if (data) {
                console.log(data);
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
                alert('Account successfully updated.');
            } else {
                alert('No changes detected or invalid entries');
            }
        });
    }

    let handleRemove = () => {
        fetch(`https://jeriflix.onrender.com/users/${username}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                setUser(null);
                alert('Your account has been deleted');
            } else {
                alert('Something went wrong');
            }
        })
    }

    return (
        <Container className='m-1 p-2 overflow-hidden'>
            <Row className='text-center'>
                <Col md={8}>
                    <h3 className='justify-content-center'>Favorite Movies</h3>
                </Col>
                <Col>
                    <h3 className='justify-content-center'>About:</h3>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <Row>
                        <Row className='flex-row flex-wrap'>
                            {FavoriteMovies.map((movie) => (
                                <Col className='mb-5' md={3} key={movie.ID}>
                                    <MovieCard
                                        movieData={movie}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Row>
                </Col>
                <Col md={4} className='ml-auto'>
                    <Card className='mb-3'>
                        <Card.Body>
                            <Card.Title>{username}</Card.Title>
                            <Card.Text>Email: {email}</Card.Text>
                            <Card.Text>Birthday: {fixedBirthday}</Card.Text>
                        </Card.Body>
                    </Card>

                    <h3 className="profile-title">Update info</h3>

                    <Form className="my-profile" encType="multipart/form-data">

                        <Form.Group className="mb-2" controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formEmail">
                            <Form.Label>Email:</Form.Label>

                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Form.Control.Feedback type="invalid">
                                Must be a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>

                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}

                            />

                            <Form.Control.Feedback type="invalid">
                                Must be a valid Birthday.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formProfilePic">
                            <Form.Label>Profile Picture:</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                name='ProfilePicture'
                                onChange={(e) => setProfilePicture(e.target.files[0])}
                            />
                        </Form.Group>

                        <Button className="update my-3 mx-5" onClick={handleUpdate} type="submit">Update</Button>
                        <Button className="delete my-3 mx-5" onClick={handleRemove}>Delete Account</Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}