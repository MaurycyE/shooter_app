import React, { useState } from 'react';
import InputField from './InputField.jsx';
import NavigationButton from './NavigationButton.jsx';
import './styles/generalStyle.css'

const SettingsPanel = ({ setIsLoggedIn, setIdLoggedUser }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSave = () => {
        // Obsługa zapisu zmian
    };

    return (
        <div className="container">
            <h2 className="appHeader">Ustawienia użytkownika</h2>

            <form>
                <InputField
                    labelContent="Nazwa użytkownika"
                    type="text"
                    value={name}
                    setChangedValue={setName()}
                />

                <InputField
                    labelContent="Email"
                    type="email"
                    value={email}
                    setChangedValue={setEmail()}
                />

                <InputField
                    labelContent="Obecne hasło"
                    type="password"
                    value={password}
                    setChangedValue={setPassword()}
                />

                <InputField
                    labelContent="Wprowadź nowe hasło"
                    type="password"
                    value={newPassword}
                    setChangedValue={setNewPassword()}
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
