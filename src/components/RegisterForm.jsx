import React, { useState } from "react";
import './RegisterForm.css';

const RegisterForm = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("Zarejestrowano użytkownika: ", { username, email, password });
    };

    return (

        <div className="container">
            <h2>Formularz rejestracji</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nazwa użytkownika:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Hasło:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <label>
                    Powtórz hasło:
                    <input type="password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Zarejestruj</button>
            </form>
        </div>
    );

};

export default RegisterForm;