import {useState} from "react";

export const LoginView = ({ onLoggedIn }) => {
    
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: Username,
            Password: Password
        };

        console.log(data);

        fetch ('https://jeriflix.onrender.com/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then ((response) => {
            if (response.ok) {
                const responseData = response.JSON();
                localStorage.setItem('user', JSON.stringify(responseData.user));
                localStorage.setItem('token', responseData.token);
                onLoggedIn(Username);
            } else {
                alert ('Login Failed');
            }
        });
    };
    return ( 
        <form onSubmit = {handleSubmit}>
            <label> 
                Username: 
                <input 
                    type = "text"
                    value = {Username}
                    onChange ={(e) => setUsername(e.target.value)}
                    required></input>
            </label>

            <label>
                Password: 
                <input 
                type = "password"
                value = {Password}
                onChange = {(e) => setPassword(e.target.value)}
                required></input>
            </label>

            <button type ="submit">
                Log in:
            </button>
        </form>
    );
};
