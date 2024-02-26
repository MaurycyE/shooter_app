import React from "react";
import './styles/generalStyle.css';

function InputField() {


    return (
        <div className="setting-item">
            <label>Imię:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>);

}

export default InputField;