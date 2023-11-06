import { useState } from 'react';
// import { axios } from 'axios';

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

        //  axios.post('https://jeriflix.onrender.com/login', {
        //     Username: userData.Username,
        //     Password: userData.Password,
        // })
        // .then((response) => {
        //     localStorage.setItem('user', JSON.stringify(response.userData.user));
        //     localStorage.setItem('token', response.userData.token);
        //     onLoggedIn(response.data.user, response.userData.token);
        // })
        // .catch((error) => {
        //     console.log(error);
        // });

        // Saturnine  Catoptric

        fetch('https://jeriflix.onrender.com/login', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => response.json())
            .then((userData) => {
                console.log('Login response: ', userData);
                if (userData.user) {
                    localStorage.setItem('user', JSON.stringify(userData.user));
                    localStorage.setItem('token', userData.token);
                    onLoggedIn(userData.user, userData.token);
                } else {
                    console.log()
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
        <form className="login-form" onSubmit={handleSubmit}>
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