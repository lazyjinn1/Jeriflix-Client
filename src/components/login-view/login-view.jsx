import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LoginView = ({ onLoggedIn }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            Username: username,
            Password: password,
        };

        fetchLogin(onLoggedIn, userData);
    }

    async function fetchLogin(onLoggedIn, userData) {
        console.log(userData);

        // await fetch('https://jeriflix.onrender.com/login', {
        await fetch('http://localhost:8080/login', {
            method: "POST",
            body: JSON.stringify(userData),
            headers: { 'Content-Type': 'application/json'},
        }).then((response) => response.json())
            .then((userData) => {
                console.log('Login response: ', userData);
                if (userData.user) {
                    localStorage.setItem('user', JSON.stringify(userData.user));
                    localStorage.setItem('token', userData.token);
                    onLoggedIn(username, userData.token);
                } else {
                    console.log(userData);
                    alert('User not found');
                }
            })
            .catch((error) => {
                console.error('Error during Login', error);
                alert('Something went wrong');
            }
        );
    };
    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group controlId = 'formUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type = 'text'
                    value = {username}
                    onChange = {(e) => {
                        setUsername(e.target.value)
                    }}
                    required
                />
            </Form.Group>

            <Form.Group controlId = 'formPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type = 'password'
                    value = {password}
                    onChange = {(e) => {
                        setPassword(e.target.value)
                    }}
                    required
                />
            </Form.Group>

            <Button variant = 'primary' type = 'submit'>
                Submit
            </Button>

        </Form>
    );
};