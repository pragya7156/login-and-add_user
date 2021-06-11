import React from 'react'
import { header } from '../Routes'
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap'
import Cookies from 'universal-cookie';
import '../styles/header.css'

const cookies = new Cookies();

function Header() {

    if (cookies.get("token") == null)
        return <Redirect to="/" />

    const getItems = (header) => {
        return (
            header.map((item, key) => (
                <Nav.Link href={item.path} key={key} className="mx-4 text-light" style={{ paddingLeft: 0 + 'px' }} >
                    {<item.icon />} {item.name}
                </Nav.Link>
            )
            ))
    }
    return (
        <>
            <Navbar className="navigation" expand="lg">
                <Navbar.Brand></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        {getItems(header)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header;
