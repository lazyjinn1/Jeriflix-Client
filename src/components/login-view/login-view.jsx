import { useState } from 'react';
import { Button, Form, Card } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {

    const [username, setUsername] = useState(''); //defaults username to an empty string and sets how to set it
    const [password, setPassword] = useState(''); //defaults password to an empty string and sets how to set it

    const handleSubmit = (event) => {
        event.preventDefault(); // prevents the default from happening which may interfere with events

        const userData = { // shows the format for how we expect to receive our login data
            Username: username,
            Password: password,
        };

        fetchLogin(onLoggedIn, userData); // launches the function below using new data gained
    }

    function fetchLogin(onLoggedIn, userData) {

        fetch('https://jeriflix.onrender.com/login', { // fetch connects us to our backend
            // await fetch('http://localhost:8080/login', {
            method: "POST",
            body: JSON.stringify(userData), // stringifys our data so it becomes a proper format
            headers: { 'Content-Type': 'application/json' }, // tells our app what kind of data is expected
        }).then((response) => response.json()) // whatever is returned is now made into json
            .then((userData) => {
                //console.log('Login response: ', userData); 
                if (userData.user) {
                    localStorage.setItem('user', JSON.stringify(userData.user)); // sets user in localStorage
                    localStorage.setItem('token', userData.token); // sets token in localStorage
                    onLoggedIn(username, userData.token); // Hook to show that we are now logged in
                } else {
                    alert('User not found'); // error if log-in info is wrong
                }
            })
            .catch((error) => {
                // console.error('Error during Login', error);
                alert('Something went wrong'); // error
            }
            );
    };
    return (
        // form for our log-in. Utilizes React-Bootstrap
        <Card className = 'p-3 mt-5'>
            <Form onSubmit={handleSubmit} className='my-1'>

                {/* form for our username*/}
                <Form.Group controlId='formUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='text'
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        required
                    />
                </Form.Group>

                {/* form for our password. Note how type is 'password' which hides it*/}
                <Form.Group controlId='formPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        required
                    />
                </Form.Group>

                {/* This is our submit button. Note how it's type is 'submit' */}
                <Button variant='primary' type='submit' className='mt-3'>
                    Submit
                </Button>

            </Form>
        </Card>

    );
};