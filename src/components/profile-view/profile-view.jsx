import { MovieCard } from '../movie-card/movie-card'
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';


export const ProfileView = ({user, setUser, token, movieData }) =>  {

    let fixedUser = JSON.parse(localStorage.getItem("user"));

    let tesobject = JSON.stringify(JSON.parse(localStorage.getItem("user")));

   
    const [username, setUsername] = useState(fixedUser.Username);
    const [password, setPassword] = useState(fixedUser.Password);
    const [email, setEmail] = useState(fixedUser.Email);
    const [birthday, setBirthday] = useState(fixedUser.Birthday);
    // let [profilePic, setPfp] = useState(user.ProfilePic);
    let [favoriteMovies, setFavoriteMovies] = useState(fixedUser.FavoriteMovies);

    let FavoriteMovies = fixedUser.FavoriteMovies ? movieData.filter((movie) => fixedUser.FavoriteMovies.includes(movie.ID)) : [];
    // console.log(FavoriteMovies);
    // console.log(user);
    // console.log(fixedUser);

    let handleUpdate = (event) => {
        event.preventDefault();
        
        

        let data = {
            username: username, 
            password: password,
            email: email,
            birthday: birthday,
           
        };
        console.log(data);
        console.log('https://jeriflix.onrender.com/users/'+ fixedUser.Username);
        fetch(`https://jeriflix.onrender.com/users/${fixedUser.Username}`, {
            method: 'PUT',
            body: data,
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then((response) => {

            console.log(response);
            if (response.ok) {
                // if (updatedUser) {
                //     localStorage.setItem('user', JSON.stringify(updatedUser));
                //     setUser(updatedUser);
                //     //window.location.reload();
                //     console.log('Account successfully updated.');
                // } else {
                //     console.log('Update failed');
                // }
                return response.json();
            } else{
                return response.text();
            }
        })
    };

    let handleRemove = () => {
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
                        <Card.Body>
                            <Card.Title>{fixedUser.Username}</Card.Title>
                            <Card.Text>Email: {fixedUser.Email}</Card.Text>
                            <Card.Text>Birthday: {fixedUser.Birthday}</Card.Text>
                        </Card.Body>
                    </Card>

                    <h2 className="profile-title">Update info</h2>

                    <Form className="my-profile">

                        {/* <Form.Group className="mb-2" controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group className="mb-2" controlId="formPassword">
                            <Form.Label>Password: </Form.Label>

                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength='8'
                                disabled
                            />

                            <Form.Control.Feedback type="invalid">
                                Password must be at least 8 characters.
                            </Form.Control.Feedback>
                        </Form.Group> */}

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
                </Col>
            </Row>
        </Container>
    )
}