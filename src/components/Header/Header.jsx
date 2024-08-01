import React from "react";
import { Row } from "react-bootstrap";
import Logo from './img/logo.png'
import './header.css';

function Header() {
    return(
        <div>
            <Row className="LogoHeader">
                <img src={Logo} alt="logo" />
            </Row>
        </div>
    )
}

export default Header