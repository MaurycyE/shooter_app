import './styles/generalStyle.css';
import React from 'react';

function Message(props) {

    return (
        <h2 className={props.className}>{props.message}</h2>
    )
}

export default Message;