import React, { useState } from "react";
import NavigationMenuButton from "./NavigationMenuButton.jsx";
import Message from "./Message.jsx";
import './styles/mainMenu.css';

const MainMenu = ({ setIsLoggedIn, idLoggedUser }) => {

    const [messageComponent, setMessageComponent] = useState({
        className: "",
        message: ""
    });
    //const idLoggedUser = idLoggedUser;
    console.log(idLoggedUser);

    function logOut() {

        setIsLoggedIn(false);
    }

    return (

        <div className="menuContainer">
            <h1 className="title">Aplikacja strzelecka</h1>
            <h2>Menu Główne</h2>
            {/* <Message
                className={messageComponent.className}
                message={messageComponent.message}
            /> */}

            <div className="buttonContainer">

                <NavigationMenuButton
                    onClickButton={() => { }}
                    content="Nowa Tarcza"
                    link="" />
                <br />

                <NavigationMenuButton
                    onClickButton={() => { }}
                    content="Przeglądaj wyniki"
                    link="" />

                <NavigationMenuButton
                    onClickButton={() => { }}
                    content="Ustawienia"
                    link="/settings" />

                <NavigationMenuButton
                    onClickButton={logOut}
                    content="Wyloguj się"
                    link="" />
            </div>


        </div>

    );

};


export default MainMenu;



//1. nowa tarcza
//2. wyloguj
//3. ustawienia
//4. przeglądaj wyniki