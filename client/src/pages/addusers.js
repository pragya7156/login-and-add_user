import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import Header from '../layout/header';
import Footer from '../layout/footer';
import '../styles/adduser.css';
import { useAlert } from 'react-alert';
import Cookies from 'universal-cookie';
import client from '../helpers/client'
import { Redirect } from 'react-router-dom';

const cookies = new Cookies();

function AddUsers() {

    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    })

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

    const alert = useAlert();

    if (cookies.get("token") == null)
        return <Redirect to="/" />

    const { name, phone, email, address } = data;

    const handleClick = async (e) => {
        e.preventDefault();
        let des_url = `/users/adduser`
        if (data.name && data.email && data.phone) {
            try {
                const add = await client.post(des_url, { ...data })
                if (add.data.status) {
                    alert.success(add.data.message);
                }
                else {
                    console.log(add.data.message);
                    alert.error(add.data.message);
                }
            } catch (err) {
                console.log(err);
                alert.error("Failed");
            }
        } else {
            alert.error('All entries are required')
        }

    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Header />
            <Container className="main">
                <h4 className="heading">Details about the User </h4>
                <Form>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Name of the User"
                            aria-label="Title"
                            aria-describedby="basic-addon1"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon2">Email-Id</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Email-id of the User"
                            aria-label="Email"
                            aria-describedby="basic-addon2"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">Phone No.</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Phone number"
                            aria-label="Phone"
                            aria-describedby="basic-addon3"
                            name="phone"
                            value={phone}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <Form.Group controlId="exampleForm.ControlTextarea1" className="forms">
                        <Form.Label>Address</Form.Label>
                        <br />
                        <Form.Control as="textarea" rows={3} name="address"
                            value={address}
                            onChange={handleChange} />
                    </Form.Group>

                    <Button style={{ backgroundColor: "#4d004d" }} type="submit" onClick={handleClick}>Add User</Button>
                </Form>
            </Container>
            <Footer />
        </>

    )
}

export default AddUsers;
