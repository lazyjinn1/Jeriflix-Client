import { MovieCard } from '../movie-card/movie-card'
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { Card, Form, Row, Col, Button, Modal } from 'react-bootstrap';


export const ProfileView = ({ user, setUser, token, movieData }) => {

    user = JSON.parse(localStorage.getItem("user"));

    const [username, setUsername] = useState(user.Username);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const fixedBirthday = new Date(birthday).toLocaleDateString('en-US', { timeZone: 'PST' });
    // let [profilePic, setPfp] = useState(user.ProfilePic);
    const [isOpen, setIsOpen] = useState(false);

    let FavoriteMovies = user.FavoriteMovies ? movieData.filter((movie) => user.FavoriteMovies.includes(movie.ID)) : [];

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });

    let handleUpdate = (event) => {
        event.preventDefault();

        let data = {
            Username: username,
            Email: email,
            Birthday: birthday,
        };
        // console.log(JSON.stringify(data));

        // fetch(`http://localhost:8080/users/${username}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(data),
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        fetch(`https://jeriflix.onrender.com/users/${username}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {

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
    }

    let handleRemove = () => {
        fetch(`https://jeriflix.onrender.com/users/${username}`, {
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
                            <Card.Title>{user.Username}</Card.Title>
                            <Card.Text>Email: {user.Email}</Card.Text>
                            <Card.Text>Birthday: {fixedBirthday}</Card.Text>
                        </Card.Body>
                    </Card>


                    <Button variant="primary" onClick= {() => setIsOpen(true)}>
                        <h3 className="profile-title">Update info</h3>
                    </Button>
                    <Modal show = {isOpen} onHide = {() => setIsOpen(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Change Account Info</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form className="my-profile">

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

                                <Button className="update my-3 mx-5" onClick={handleUpdate} type="submit">Update</Button>
                                <Button className="delete my-3 mx-5" onClick={handleRemove}>Delete Account</Button>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick = {() => setIsOpen(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>


                </Col>
            </Row>
        </Container>
    )
}