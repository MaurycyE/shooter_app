import React, { useEffect, useState } from 'react';
import InputField from './InputField.jsx';
import NavigationButton from './NavigationButton.jsx';
import { Settings } from '../server/Settings.js';
import './styles/generalStyle.css'

const SettingsPanel = ({ setIsLoggedIn, idLoggedUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');


    useEffect(() => {

        async function fetchData() {

            const settingsProcess = new Settings(idLoggedUser);
            let [currentUserData] = await settingsProcess.getUsernameAndEmail();
            setName(currentUserData.user_name);
            setEmail(currentUserData.user_email);


        }

        fetchData();

    }, []);

    const handleSave = () => {

        const settingsProcess = new Settings(idLoggedUser);
        settingsProcess.saveNewUserData(name, email);
        // Obsługa zapisu zmian
    };

    //console.log(password);
    return (
        <div className="container">
            <h2 className="appHeader">Ustawienia użytkownika</h2>

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
                {/* <div className="setting-item">
                    <label>Imię:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div> */}

                <NavigationButton
                    onClickButton={handleSave}
                    content="Zapisz zmiany"
                    link="" />

                <NavigationButton
                    onClickButton={() => { }}
                    content="Powrót"
                    link="/mainMenu" />

            </form>
        </div>
    );
};

export default SettingsPanel;
