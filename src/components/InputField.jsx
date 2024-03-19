import React, { useEffect, useState } from "react";
import './styles/generalStyle.css';

function InputField(props) {

    const [inputValue, setInputValue] = useState(props.value);

    //console.log("kolejność: input");
    //console.log(props.value);

    // useEffect(() => {

    //     if (props.value) {
    //         setInputValue(props.value);
    //     }
    // });

    const handleChange = (targetValue) => {

        setInputValue(targetValue);
        props.setChangedValue(targetValue);
        //console.log(inputValue);
    };

    return (
        <div>
            <label>{props.labelContent}</label>
            <input
                type={props.type}
                value={props.value}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>);

}

export default InputField;