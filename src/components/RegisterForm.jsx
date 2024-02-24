import React, { useState } from "react";
import NavigationButton from "./NavigationButton";
import Message from "./Message";
import { RegisterNewUser } from "../server/RegisterNewUser.js";
import './styles/generalStyle.css';

const RegisterForm = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [messageComponent, setMessageComponent] = useState({
        className: "",
        message: ""
    })

    const handleSubmit = async () => {

        //console.log("Zarejestrowano użytkownika: ", { username, email, password, confirmedPassword });
        const registrationProcess = new RegisterNewUser(username, email, password);
        const hashPassword = await registrationProcess.cryptPassword();
        
    };

    return (

        <div className="container">
            <h1 className="appHeader">Aplikacja strzelecka</h1>
            <h2>Formularz rejestracji</h2>
            <Message
                className={messageComponent.className}
                message={messageComponent.message}
            />
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
                <NavigationButton
                    onClickLoginButton={handleSubmit}
                    content="Zarejestruj"
                    link="" />
                <br />
                <NavigationButton
                    onClickLoginButton={() => { }}
                    content="Zaloguj"
                    link="/" />

            </form>
        </div>
    );

};

export default RegisterForm;