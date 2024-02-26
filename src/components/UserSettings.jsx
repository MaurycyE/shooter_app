import React, { useState } from 'react';

const SettingsPanel = ({ user }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSave = () => {
        // Obsługa zapisu zmian
    };

    return (
        <div className="settings-panel">
            <h2>Ustawienia użytkownika</h2>
            <div className="setting-item">
                <label>Imię:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="setting-item">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="setting-item">
                <label>Hasło:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="setting-item">
                <label>Nowe hasło:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <button onClick={handleSave}>Zapisz zmiany</button>
        </div>
    );
};

export default SettingsPanel;
