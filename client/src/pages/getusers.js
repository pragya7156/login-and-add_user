import React, { useEffect, useState } from 'react';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { Container } from 'react-bootstrap';
import Cards from '../components/user-card';
import '../styles/getuser.css';
import client from '../helpers/client';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

const cookies = new Cookies();

function GetUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    let des_url = `/api/get_users`
    client.post(des_url)
      .then(res => {
        setUsers(res.data.result);
      });
  }, [setUsers, users]);

  if (cookies.get("token") == null)
        return <Redirect to="/" />

  const Users = users.map((item, idx) => {
    return {
      key: idx,
      id: item.user_id,
      name: item.name,
      phone: item.phone,
      date: item.created_at,
      email: item.email,
      address: item.address
    }
  });

  return (
    <>
      <Header />
      {Users.length <= 0 ? (
        <div>No Users Available</div>
      ) : (
        <>
          <Container className="card-container mt-5">
            {Users.map((item, idx) => (
              <Cards
                phone={item.phone}
                name={item.name}
                date={item.date}
                key={idx}
                id={item.id}
                email={item.email}
                address={item.address}
              />
            ))}
          </Container>
        </>)}
      <Footer />
    </>
  );

}

export default GetUsers;