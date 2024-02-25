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
    const [isValidEmail, setIsValidEmail] = useState("");
    const [messageComponent, setMessageComponent] = useState({
        className: "",
        message: ""
    })
    const reg = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;

    const clearFormFields = () => {

        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmedPassword("");
    }

    const handleSubmit = async () => {

        let isUserDataValid = true;

        if (password === confirmedPassword) {

            const registrationProcess = new RegisterNewUser(username, email, password);

            let checkCondition = await registrationProcess.findUsername();
            if (checkCondition) {

                setMessageComponent({
                    className: "alertMessage",
                    message: "Nazwa użytkownika już istnieje"
                });
                isUserDataValid = false;
            }

            checkCondition = await registrationProcess.findEmail();
            if (checkCondition) {

                setMessageComponent({
                    className: "alertMessage",
                    message: "Email już istnieje"
                });
                isUserDataValid = false;
            };

            checkCondition = await registrationProcess.areAllFieldsFilled();
            if (!checkCondition) {

                setMessageComponent({
                    className: "alertMessage",
                    message: "Wypełnij wszystkie pola"
                });
                isUserDataValid = false;
            };

            if (!isValidEmail) {

                setMessageComponent({
                    className: "alertMessage",
                    message: "Nieprawidłowy email"
                });
                isUserDataValid = false;
            }

            checkCondition = await registrationProcess.isPasswordToShort();
            if (checkCondition) {

                setMessageComponent({
                    className: "alertMessage",
                    message: "Hasło powinno zawierać conajmniej 8 znaków"
                });
                isUserDataValid = false;
            };

            console.log(isUserDataValid);

            if (isUserDataValid) {

                registrationProcess.addUserToDatabase();
                setMessageComponent({
                    className: "successMessage",
                    message: "Rejestracja zakończona sukcesem!"
                });
                clearFormFields();
            }

        } else {

            setMessageComponent({
                className: "alertMessage",
                message: "Hasła nie są zgodne"
            });

        }

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
                    <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input required type="email" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                        const checkEmail = reg.test(e.target.value);
                        setIsValidEmail(checkEmail);
                    }} />
                </label>
                <br />
                <label>
                    Hasło:
                    <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <label>
                    Powtórz hasło:
                    <input required type="password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
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