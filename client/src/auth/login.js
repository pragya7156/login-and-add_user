import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Form, InputGroup, FormControl, Card } from 'react-bootstrap';
import { useAlert } from 'react-alert';
import Cookies from 'universal-cookie';
import '../styles/adduser.css';

const cookies = new Cookies();

function Login() {

    const alert = useAlert();
    const history = useHistory();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const { email, password } = user;

    const handleChange = async (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }


    const handleClick = async (e) => {
        e.preventDefault();
        if (user.email && user.password) {
            if (user.email === "admin@namasys.co" && user.password === "admin123") {
                alert.success("Successfully logged in");
                cookies.set('token', 'LoginTopSecret', { path: '/', expires: new Date(Date.now() + 300000) });
                history.push('/addusers')
                //<Redirect to={{ pathname: '/addusers' }} />
            }
            else {
                alert.error("Wrong Credentials");
            }
        }
        else {
            alert.error("All fields are Required");
        }
    }

    return (
        <>
            <Container className="main">
                <Card className="cards">
                    <h4 style={{ marginBottom: 15 + 'px' }}> Login </h4>
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Email"
                                aria-describedby="basic-addon1"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon2">Password</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="password"
                                aria-label="Password"
                                aria-describedby="basic-addon2"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </InputGroup>

                        <Button style={{ backgroundColor: "#4d004d", marginRight: 5 + 'px', marginBottom: 5 + 'px' }} type="submit" onClick={handleClick}>Login</Button>
                    </Form>
                </Card>
            </Container>
        </>
    )
}

export default Login;
