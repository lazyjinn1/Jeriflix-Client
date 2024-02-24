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
import './profile-view.scss';

export const ProfileView = ({ user, setUser, token, movieData }) => {

    user = JSON.parse(localStorage.getItem("user"));

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const fixedBirthday = new Date(birthday).toLocaleDateString('en-US', { timeZone: 'UTC' }); // Fixes Birthday to be in a better format
    const [selectedProfilePicture, setSelectedProfilePicture] = useState(); // Changes based on what is selected
    const [isPictureMenuOpen, setIsPictureMenuOpen] = useState(false); // Picture Menu is the profile Picture modal
    const [isOpen, setIsOpen] = useState(false); // This is for the other detail Modal
    const [isPasswordMenuOpen, setIsPasswordMenuOpen] = useState(false);
    const [bio, setBio] = useState(user.Bio);

    // If there is a better way of doing this PLEASE let me know. I'd love to hear it.
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

    // Filters based on the user's favorite Movies array
    let FavoriteMovies = user.FavoriteMovies ? movieData.filter((movie) => user.FavoriteMovies.includes(movie.ID)) : [];

    // function for picking a profile picture
    let pickPFP = (picture) => {
        setSelectedProfilePicture(picture);
    }

    // updates user info
    let handleUpdate = (event) => {
        event.preventDefault();

        let data = {
            Username: username,
            Email: email,
            Birthday: birthday,
            ProfilePicture: selectedProfilePicture,
            Bio: bio
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
                    console.log(response);
                    return response.json();
                } else {
                    return response.text();
                }

            }).then((data) => {
                if (data) {
                    setUser(data);
                    alert('Account successfully updated.');
                    localStorage.setItem('user', JSON.stringify(data));
                } else {
                    console.log('No changes detected or invalid entries');
                }
            });
    }

    // changes the password
    let handleUpdatePassword = (event) => {
        event.preventDefault();

        let data = {
            Password: password,
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
                    console.log(response);
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
                    console.log('No changes detected or invalid entries');
                }
            });
    }

    // deletes the user
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
                console.log('Something went wrong');
            }
        })
    }



    return (
        <Container className='mx-5 p-1'>
            <Row className='text-center'>
                <Col md={8}>
                    <h3 className='justify-content-center'>Favorite Movies</h3>
                </Col>
                <Col md={3}>
                    <h3 className='justify-content-center profile-body'>About:</h3>
                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <Row>
                        {/* User's Favorite Movies */}
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
                <Col md={3} className='profile-body'>
                    <Row>
                        <Card className='p-1 mb-3 Account-Info'>
                            {/* Main User Account Info Card */}
                            <Card.Body>
                                <Card.Img className='ProfilePicture'
                                    src={user.ProfilePicture}>
                                </Card.Img>
                                <Card.Title>{user.Username}</Card.Title>
                                <Card.Text>Email: {user.Email}</Card.Text>
                                <Card.Text>Birthday: {fixedBirthday}</Card.Text>
                                <Card.Text>{user.Bio}</Card.Text>

                            </Card.Body>
                        </Card>
                    </Row>

                    <Row>
                        {/* Opens up the Update Account Modal */}
                        <Button className='p-2 mb-3 profile-title' variant="primary" onClick={() => setIsOpen(true)}>
                            <h5 className="profile-title">Update Account</h5>
                        </Button>
                    </Row>


                    {/* Update Account Modal */}
                    <Modal className='w-100 h-100' show={isOpen} onHide={() => setIsOpen(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form className="my-profile">
                                <Row>
                                    <Col>
                                        <Button className="mb-2 py-0" onClick={() => setIsPictureMenuOpen(true)}>
                                            <p className="profile-title">Change Profile Picture</p>
                                        </Button>
                                    </Col>

                                    <Col>
                                        <Card.Img className='PreviewPicture'
                                            src={selectedProfilePicture}>
                                        </Card.Img>
                                    </Col>

                                    {/* Opens up Secondary Modal for choosing profile Picture */}
                                    <Modal show={isPictureMenuOpen} onHide={() => setIsPictureMenuOpen(false)}>

                                        <Modal.Header closeButton>
                                            <Modal.Title>Choose your favorite!</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <Row className='flex-row flex-wrap'>
                                                {profilePictures.map((pictureData) => (
                                                    <Col className='mb-5' md={4} key={pictureData}>
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
                                    <Col>
                                        <Button className='mb-2 py-0' onClick={() => setIsPasswordMenuOpen(true)}>
                                            <p>Change Password</p>
                                        </Button>
                                    </Col>

                                    <Modal className='p-2 ' show={isPasswordMenuOpen} onHide={() => setIsPasswordMenuOpen(false)}>

                                        <Modal.Header closeButton>
                                            <Modal.Title>Change Password Here</Modal.Title>
                                        </Modal.Header>

                                        <Form.Group className="p-3 " controlId="formPassword">
                                            <Form.Label>Password:</Form.Label>
                                            <Form.Control
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Button className="update my-3 mx-5" onClick={handleUpdatePassword} type="submit">Update</Button>

                                    </Modal>
                                </Row>

                                {/*  Form for updating Username.*/}
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

                                    {/*  Form for updating Email */}
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

                                    {/*  Form for updating Birthday. Currently sets it to the day before your birthday due to timezones */}
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

                                    <Form.Group>
                                        <Form.Label>Description: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={bio}
                                            placeholder="What's on your mind?"
                                            maxLength="30"
                                            onChange={(e) => setBio(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                </Row>



                                {/* Button for updating account */}
                                <Button className="update my-3 mx-5" onClick={handleUpdate} type="submit">Update</Button>
                                {/* Button for deleting account */}
                                <Button className="delete my-3 mx-5" onClick={handleRemove}>Delete Account</Button>

                            </Form>
                        </Modal.Body>

                        {/* Close the Modal Button */}
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setIsOpen(false)}>Close</Button>
                        </Modal.Footer>
                    </Modal>


                </Col>
            </Row>
        </Container>
    )
}