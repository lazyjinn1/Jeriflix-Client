import { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

import { MovieCard } from '../movie-card/movie-card'

export const ProfileView = ({ user, setUser, token, movieData }) => {

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = (useState(user.Birthday));
    const [favMovies, setFavMovies] = (useState(user.FavoriteMovies));

    let formattedBirthday = new Date(birthday.replace(/-/g, '\/').replace(/T.+/, '')).toLocaleDateString();

    let FavoriteMovies = user.FavoriteMovies ? movieData.filter((movie) => user.FavoriteMovies.includes(movie.ID)) : [];

    const handleUpdate = (event) => {
        event.preventDefault();

        let data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };

        fetch(`https://jeriflix.onrender.com/users/${username}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.text();
            }
        }).then((data) => {
            if (data) {
                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
                alert('Account successfully updated.');
            } else {
                alert('No changes detected or invalid entries');
            }
        });
    };

    const handleRemove = () => {
        fetch(`https://jeriflix.onrender.com/users/${username}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                setUser(null);
                setToken(null);
                localStorage.clear();
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
                    <h3>About:</h3>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <Row>
                        <Row className='flex-row flex-nowrap'>
                            {FavoriteMovies.map((movie) => (
                                <Col className='mb-5' md={3}>
                                    <MovieCard
                                        key={movie.ID}
                                        movieData={movie}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Row>
                </Col>
                <Col md={4} className='ml-auto text-center'>
                    <Card >
                        <Card.Body>
                            <Card.Title>{username}</Card.Title>
                            <Card.Text>Email: {email}</Card.Text>
                            <Card.Text>Birthday: {formattedBirthday}</Card.Text>
                        </Card.Body>
                    </Card>

                    <h2 className='profile-title justify-content-center'>Update info</h2>

                    <Form className='my-profile' onSubmit = {handleUpdate}>

                        <Form.Group className='mb-2' controlId='formUsername'>
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                                type='text'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                minLength='6'
                                disabled
                                
                                placeholder='Change Username here'
                            />

                            <Form.Control.Feedback type='invalid'>
                                Username must be at least 6 characters.
                            </Form.Control.Feedback>
                        </Form.Group >

                        <Form.Group className="mb-2" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength='8'
                                disabled
                                placeholder='Change Password here'
                            />
                            <Form.Control.Feedback type="invalid">
                                Password must be at least 8 characters.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-2' controlId='formEmail'>
                            <Form.Label>Email:</Form.Label>

                            <Form.Control
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Form.Control.Feedback type='invalid'>
                                Must be a valid email.
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group controlId='formBirthday'>
                            <Form.Label>Birthday:</Form.Label>

                            <Form.Control
                                type='date'
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />

                            <Form.Control.Feedback type='invalid'>
                                Must be a valid Birthday.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button className='update my-3 mx-3' onClick={handleUpdate} type='submit'>Update</Button>
                        <Button className='delete my-3 mx-3' onClick={handleRemove}>Delete Account</Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}