import React, { useState } from "react";
import './styles/generalStyle.css';

function InputField(props) {

    const [inputValue, setInputValue] = useState("");

    const handleChange = () => {


    };

    return (
        <div>
            <label>{props.labelContent}</label>
            <input
                type={props.type}
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>);

}

export default InputField;