import React, { useState } from "react";
import NavigationButton from "./NavigationButton.jsx";
import Message from "./Message.jsx";
import './styles/generalStyle.css';

const MainMenu = ({ setIsLoggedIn }) => {

    const [messageComponent, setMessageComponent] = useState({
        className: "",
        message: ""
    });

    function logOut() {

        setIsLoggedIn(false);
    }

    return (

        <div className="container">
            <h1 className="appHeader">Aplikacja strzelecka</h1>
            <h2>Menu Główne</h2>
            <Message
                className={messageComponent.className}
                message={messageComponent.message}
            />


            <NavigationButton
                onClickButton={() => { }}
                content="Zaloguj"
                link="" />
            <br />

            <NavigationButton
                onClickButton={() => { }}
                content="Zarejestruj"
                link="" />

            <NavigationButton
                onClickButton={logOut}
                content="Wyloguj się"
                link="" />


        </div>

    );

};


export default MainMenu;



//1. nowa tarcza
//2. wyloguj
//3. ustawienia
//4. przeglądaj wyniki