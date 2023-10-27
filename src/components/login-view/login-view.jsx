import {useState, useEffect} from "react";

export const LoginView = () => {
    
    const [username, setUsername] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            access: username,
            secret: password
        };

        fetch ('https://jeriflix.onrender.com/login', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    };
    return ( 
        <form onSubmit = {handleSubmit}>
            <label> 
                Username: 
                <input 
                    type = "text"
                    value = {username}
                    onChange ={(e) => setUsername(e.target.value)}></input>
            </label>

            <label>
                Password: <input type = "password"></input>
            </label>

            <button type ="submit">
                Log in:
            </button>
        </form>
        
    )
}
