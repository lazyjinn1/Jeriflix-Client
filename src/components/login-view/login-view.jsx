import { useState } from 'react';

export const LoginView = ({ onLoggedIn }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        };

        console.log(data);

        fetch('https://jeriflix.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })  .then((response) => response.json())
            .then((data) => {
                console.log('Login response: ', data);
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert('Something went wrong3');
                }
            })
            .catch((error) => {
                console.error('Error during Login', error);
                alert('Something went wrong4');
            }
        );
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
            Username:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                 />
            </label>

            <label>
            Password:
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>

            <button type='submit'>
                Log in:
            </button>
        </form>
    );
};