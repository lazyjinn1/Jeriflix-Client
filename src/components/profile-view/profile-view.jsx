import { MovieCard } from '../movie-card/movie-card';
import { PictureCard } from '../picture-card/picture-card';
import Container from 'react-bootstrap/Container';
import Avatar1 from '../../../assets/ProfilePictures/Avatar1.png'
import Avatar2 from '../../../assets/ProfilePictures/Avatar2.png'
import Avatar3 from '../../../assets/ProfilePictures/Avatar3.png'
import Avatar4 from '../../../assets/ProfilePictures/Avatar4.png'
import Avatar5 from '../../../assets/ProfilePictures/Avatar5.png'
import Avatar6 from '../../../assets/ProfilePictures/Avatar6.png'
import Avatar7 from '../../../assets/ProfilePictures/Avatar7.png'
import Avatar8 from '../../../assets/ProfilePictures/Avatar8.png'
import Avatar9 from '../../../assets/ProfilePictures/Avatar9.png'
import { useState } from 'react';
import { Card, Form, Row, Col, Button, Modal } from 'react-bootstrap';


export const ProfileView = ({ user, setUser, token, movieData }) => {

    user = JSON.parse(localStorage.getItem("user"));

    const [username, setUsername] = useState(user.Username);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const fixedBirthday = new Date(birthday).toLocaleDateString('en-US', { timeZone: 'PST' });
    const [selectedProfilePicture, setSelectedProfilePicture] = useState();
    const [isPictureMenuOpen, setIsPictureMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const profilePictures = [
        Avatar1,
        Avatar2,
        Avatar3,
        Avatar4,
        Avatar5,
        Avatar6,
        Avatar7,
        Avatar8,
        Avatar9
    ];

    let FavoriteMovies = user.FavoriteMovies ? movieData.filter((movie) => user.FavoriteMovies.includes(movie.ID)) : [];

    let pickPFP = (picture) => {
        setSelectedProfilePicture(picture);
    }
    let handleUpdate = (event) => {
        event.preventDefault();

        let data = {
            Username: username,
            Email: email,
            Birthday: birthday,
            ProfilePicture: selectedProfilePicture
        };

        // fetch(`http://localhost:8080/users/${username}`, {
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
                                <Col className='mb-5' md={4} key={movie.ID}>
                                    <MovieCard
                                        movieData={movie}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Row>
                </Col>
                <Col md={4} className='ml-auto'>
                    <Card className='mx-3 p-1 mb-3 Account-Info'>
                        <Card.Body>
                            <Card.Img className='ProfilePicture'
                                src={user.ProfilePicture}>
                            </Card.Img>
                            <Card.Title>{user.Username}</Card.Title>
                            <Card.Text>Email: {user.Email}</Card.Text>
                            <Card.Text>Birthday: {fixedBirthday}</Card.Text>
                        </Card.Body>
                    </Card>


                    <Button className='mx-3 p-3 mb-3' variant="primary" onClick={() => setIsOpen(true)}>
                        <h5 className="profile-title">Update Account</h5>
                    </Button>
                    <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form className="my-profile">
                                <Row>
                                    <Col>
                                        <Button onClick={() => setIsPictureMenuOpen(true)}>
                                            <p className="profile-title">Change Profile Picture</p>
                                        </Button>
                                    </Col>

                                    <Col>
                                        <Card.Img className='PreviewPicture'
                                            src={selectedProfilePicture}>
                                        </Card.Img>
                                    </Col>

                                    <Modal show={isPictureMenuOpen} onHide={() => setIsPictureMenuOpen(false)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Choose your favorite!</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <Row className='flex-row flex-wrap'>
                                                {profilePictures.map((pictureData) => (
                                                    <Col className='mb-5' md={4}>
                                                        <PictureCard
                                                            pictureData={pictureData}
                                                            onSelect={() => {
                                                                pickPFP(pictureData)
                                                                setIsPictureMenuOpen(false)
                                                            }}
                                                        />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </Modal.Body>

                                    </Modal>
                                </Row>

                                <Row>
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
                                </Row>


                                <Button className="update my-3 mx-5" onClick={handleUpdate} type="submit">Update</Button>
                                <Button className="delete my-3 mx-5" onClick={handleRemove}>Delete Account</Button>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setIsOpen(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>


                </Col>
            </Row>
        </Container>
    )
}