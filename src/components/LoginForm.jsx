import React, { useState } from "react";
import './styles/RegisterForm.css';

const LoginForm = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("zalogowano użytkownika: ", { username, password });
    };

    return (

        <div className="container">
            <h1 className="appHeader">Aplikacja strzelecka</h1>
            <h2>Formularz rejestracji</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nazwa użytkownika:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Hasło:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>

                <br />
                <button type="submit">Zaloguj się</button>
                <br />
                <button>Zarejestruj</button>

            </form>
        </div>
    );

};

export default LoginForm;