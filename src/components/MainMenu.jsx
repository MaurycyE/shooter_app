import React from "react";
import NavigationButton from "./NavigationButton";

const MainMenu = () => {

    return (
        <div>
            <h1>Menu główne</h1>
            <NavigationButton
                onClickLoginButton={() => { }}
                content="powrót"
                link="/" />
        </div>);

};


export default MainMenu;

