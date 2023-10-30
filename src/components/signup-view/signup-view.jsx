import { useState } from 'react'


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
        <form onSubmit = {handleSubmit}>
            <label>
                Username:
                    <input 
                        type = 'text' 
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                        required
                        minLength = '3'
                    />
            </label>
            <br></br>
            <label>
            Password:
                    <input 
                        type = 'password' 
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        required
                        minLength = '8'
                        maxLength = '16'
                    />
            </label>
            <br></br>
            <label>
            Email:
                    <input 
                        type = 'text' 
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        required
                    />
            </label>
            <br></br>
            <label>
            Birthday:  
                    <input 
                        type = 'date' 
                        value = {birthday}
                        onChange = {(e) => setBirthday(e.target.value)}
                        required
                    />
            </label>
            <button type = 'submit'>Submit</button>
        </form>
    );
};