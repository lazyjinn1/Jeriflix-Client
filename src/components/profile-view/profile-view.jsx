import { MovieCard } from '../movie-card/movie-card'
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';


export const ProfileView = ({ user, setUser, token, movieData }) => {

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    //const [profilePic, setPfp] = useState(user.ProfilePic);

    let FavoriteMovies = user.FavoriteMovies ? movieData.filter((movie) => user.FavoriteMovies.includes(movie.ID)) : [];
    console.log(FavoriteMovies);

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
            console.log(response)
            if (response.ok) {
                return response.json();
            } else {
                return response.text();
            }
        }).then((newData) => {
            if (newData) {
                localStorage.setItem('user', JSON.stringify(newData));
                setUser(newData);
                window.location.reload();
                console.log('Account successfully updated.');
            } else {
                console.log('Update failed');
            }
        })
    };

    const handleRemove = () => {
        fetch(`https://jeriflix.onrender.com/users/${user.Username}`, {
            method: 'DELETE',
            headers: {
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
                <Col md={9}>
                    <h3 className='justify-content-center'>Favorite Movies</h3>
                </Col>
                <Col>
                    <h3 className='justify-content-center'>About:</h3>
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
                <Col md={4} className='ml-auto'>
                    <Card >
                        {/* {pictureUrl && (
                        <Image src={'..../assets/silenceofthelambs.jpg'} alt="User Profile Picture" fluid />
                    )} */}
                        <Card.Body>
                            <Card.Title>{username}</Card.Title>
                            {/* {shortBio && <Card.Text>{shortBio}</Card.Text>} */}
                            <Card.Text>Email: {email}</Card.Text>
                            <Card.Text>Birthday: {birthday}</Card.Text>
                        </Card.Body>
                    </Card>

                    <h2 className="profile-title">Update info</h2>

                    <Form className="my-profile" onSubmit={handleUpdate}>

                        <Form.Group className="mb-2" controlId="formUsername">
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                minLength='6'
                                
                                placeholder='Change Username here'
                            />

                            <Form.Control.Feedback type="invalid">
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

                        <Form.Group className="mb-2" controlId="formEmail">
                            <Form.Label>Email:</Form.Label>

                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Change Email here'
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
                                placeholder='xx/xx/20xx'
                            />

                            <Form.Control.Feedback type="invalid">
                                Must be a valid Birthday.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button className="update my-3 mx-5" onClick={handleUpdate} type="submit">Update</Button>
                        <Button className="delete my-3 mx-5" onClick={handleRemove}>Delete Account</Button>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}