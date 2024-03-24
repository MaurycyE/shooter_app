import React, { useEffect, useState } from 'react';
import InputField from './InputField.jsx';
import NavigationButton from './NavigationButton.jsx';
import Message from "./Message";
import { Settings } from '../server/Settings.js';
import './styles/generalStyle.css'

const SettingsPanel = ({ setIsLoggedIn, idLoggedUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [messageComponent, setMessageComponent] = useState({
        className: "",
        message: ""
    })

    useEffect(() => {

        async function fetchData() {

            const settingsProcess = new Settings(idLoggedUser);
            let [currentUserData] = await settingsProcess.getUsernameAndEmail();
            setName(currentUserData.user_name);
            setEmail(currentUserData.user_email);

        }

        fetchData();

    }, []);

    const handleUserDataSave = async () => {

        const settingsProcess = new Settings(idLoggedUser);

        const result = await settingsProcess.saveNewUserData(name, email);


        setMessageComponent({
            className: result.className,
            message: result.message
        });

    };

    const handlePasswordSave = async () => {

        const settingsProcess = new Settings(idLoggedUser);

        if (password.length > 0 && newPassword.length > 0) {

            const passwordChange = await settingsProcess.changePassword(password, newPassword, name);

            setMessageComponent({
                className: passwordChange.className,
                message: passwordChange.message
            });

            setPassword("");
            setNewPassword("");
        }
        else {
            setMessageComponent({
                className: "alertMessage",
                message: "Wypełnij pola"
            });
        }
    };


    return (
        <div className="container">
            <h2 className="appHeader">Ustawienia użytkownika</h2>

            <Message
                className={messageComponent.className}
                message={messageComponent.message}
            />

            <form>
                <InputField
                    labelContent="Nazwa użytkownika"
                    type="text"
                    value={name}
                    setChangedValue={setName}
                />

                <InputField
                    labelContent="Email"
                    type="email"
                    value={email}
                    setChangedValue={setEmail}
                />

                <NavigationButton
                    onClickButton={handleUserDataSave}
                    content="Zapisz zmiany"
                    link="" />

            </form>
            <h2 className="appHeader">Zmiana hasła:</h2>

            <form>

                <InputField
                    labelContent="Obecne hasło"
                    type="password"
                    value={password}
                    setChangedValue={setPassword}
                />

                <InputField
                    labelContent="Wprowadź nowe hasło"
                    type="password"
                    value={newPassword}
                    setChangedValue={setNewPassword}
                />

                <NavigationButton
                    onClickButton={handlePasswordSave}
                    content="Zapisz zmiany"
                    link="" />

            </form>

            <NavigationButton
                onClickButton={() => { }}
                content="Powrót"
                link="/mainMenu" />
        </div>
    );
};

export default SettingsPanel;
