import './styles/RegisterForm.css';
import { Link } from 'react-router-dom';

function NavigationButton(props) {

    return (

        <Link to={props.link}>
            <button onClick={() => {

                props.onClickLoginButton();
            }}>{props.content}</button>
        </Link>
    );
}

export default NavigationButton;