import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import NavigationButton from "./NavigationButton.jsx";
import Message from "./Message.jsx";
import { VerifyUser } from "../server/VerifyUser.js";
import './styles/generalStyle.css';

const LoginForm = ({ setIsLoggedIn, setIdLoggedUser }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [messageComponent, setMessageComponent] = useState({
        className: "",
        message: ""
    })
    //const navigate = useNavigate();

    const getUserId = async () => {


    }

    const handleSubmit = async () => {

        const verifyUser = new VerifyUser(username, password);
        const verified = await verifyUser.checkPassword();
        setIsVerified(verified);
        const userId = await verifyUser.getUserId();
        //console.log(userId);

        if (verified) {

            console.log("zalogowany");
            setIdLoggedUser(userId);
            setIsLoggedIn(true);

            //navigate("./MainMenu");

        } else {
            setMessageComponent({
                className: "alertMessage",
                message: "Nieprawidłowe hasło lub nazwa użytkownika"
            });
            setPassword("");
        }

    };

    return (

        <div className="container">
            <h1 className="appHeader">Aplikacja strzelecka</h1>
            <h2>Logowanie</h2>
            <Message
                className={messageComponent.className}
                message={messageComponent.message}
            />
            <form onSubmit={handleSubmit}>
                <label>
                    Nazwa użytkownika:
                    <input required type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                </label>
                <br />
                <label>
                    Hasło:
                    <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>

                <br />

                <NavigationButton
                    onClickButton={handleSubmit}
                    content="Zaloguj"
                    link="" />
                <br />

                <NavigationButton
                    onClickButton={() => { }}
                    content="Zarejestruj"
                    link="/register" />

            </form>
        </div>
    );

};

export default LoginForm;