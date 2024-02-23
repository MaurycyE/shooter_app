import React, { useState } from "react";
import NavigationButton from "./NavigationButton.jsx";
import { VerifyUser } from "../server/VerifyUser.js";
import './styles/RegisterForm.css';

const LoginForm = () => {

    const isVerified = false;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {

        console.log({ username, password });

        const verifyUser = new VerifyUser(username);
        verifyUser.checkPassword();
        //event.preventDefault();

        //console.log("zalogowano użytkownika: ", { username, password });
    };

    return (

        <div className="container">
            <h1 className="appHeader">Aplikacja strzelecka</h1>
            <h2>Formularz rejestracji</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nazwa użytkownika:
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                </label>
                <br />
                <label>
                    Hasło:
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>

                <br />
                {/* <button type="submit">Zaloguj się</button> */}
                <NavigationButton
                    onClickLoginButton={handleSubmit}
                    //type="submit"
                    content="Zaloguj"
                    link="" />
                <br />
                {/* <button>Zarejestruj</button> */}
                <NavigationButton
                    content="Zarejestruj"
                    link="/register" />

            </form>
        </div>
    );

};

export default LoginForm;