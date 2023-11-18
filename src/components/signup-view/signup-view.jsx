import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



export const SignUpView = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleSubmit = (event) => {
            event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };

        fetch('https://jeriflix.onrender.com/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json'}
        }).then((response) => {
            if (response.ok) {
                alert ('Signup Successful');
                window.location.reload();
            } else {
                alert('Signup Failed');
            }
        });
    };

    return (
        <Form onSubmit = {handleSubmit}>
           <Form.Group controlId = 'formUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type = 'text'
                    value = {username}
                    onChange = {(e) => {
                        setUsername(e.target.value)
                    }}
                    required
                    minLength = '6'
                    placeholder = 'Write Username here'
                />
                <Form.Control.Feedback type="invalid">
                    Username must be at least 6 characters.
                </Form.Control.Feedback>
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
                    minLength = '8'

                    placeholder = 'Write Password here'
                />

                <Form.Control.Feedback type="invalid">
                    Password must be at least 8 characters.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId = 'formEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type = 'email'
                    value = {email}
                    onChange = {(e) => {
                        setEmail(e.target.value)
                    }}
                    required
                    placeholder = 'Write Email here'
                />

                <Form.Control.Feedback type="invalid">
                    Must be a valid email.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId = 'formBirthday'>
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                    type = 'date'
                    value = {birthday}
                    onChange = {(e) => {
                        setBirthday(e.target.value)
                    }}
                    required
                />

                <Form.Control.Feedback type="invalid">
                    Must be a valid Birthday.
                </Form.Control.Feedback>
            </Form.Group>



            <Button variant = 'primary' type = 'submit'>
                Submit
            </Button>
        </Form>
    );
};