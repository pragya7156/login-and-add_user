import React, { useState, useCallback, useEffect } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { Button, Modal } from 'react-bootstrap';
import client from '../helpers/client';
import { useAlert } from 'react-alert';

function UsersCard(props) {

  const alert = useAlert();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const handleDelete = useCallback(() => {

    handleClosedel();

    let des_url = `/users/deluser`
    const user_id = props.id;
    client.post(des_url, { user_id })
      .then(res => {
        console.log(res.data.result);
        alert.success(res.data.message)
      });

  }, [props.id, alert])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showdel, setShowdel] = useState(false);

  const handleClosedel = () => setShowdel(false);
  const handleShowdel = () => setShowdel(true);

  let ist = new Date(props.date).getDay()
  var s = new Date(props.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  var time = s.split(" ")[2];
  var time2 = s.split(" ")[0];
  time2 = time2.replace(",", " ")
  time = time.toUpperCase();
  s = s.replace("pm", `${time}`)
  s = s.replace("am", `${time}`)
  s = s.split(",")[1]
  var weekday = new Array(7);
  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  var n = weekday[ist];


  return (
    <div className="flex">
      <div className="Cards">
        <section className="cards mb-5">
          <h1>{props.name}</h1>
          <p>{props.phone}</p>
          <p>{props.email}</p>
          <p>{props.address}</p>
          <small>{`${n} ${time2}`}</small>
          <small>{`${s}`}</small>

          <div className="actions">
            <div className="preview" onClick={handleShow}>
              {<IoEyeSharp />} Preview
            </div>
            <span className="delete" onClick={handleShowdel}>
              {<MdDelete />} Delete
            </span>
          </div>
        </section>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body><div style={{ textAlign: 'left' }}>{props.phone}</div>
          {props.email} <br /> {props.address}</Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#4d004d" }} onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showdel} onHide={handleClosedel} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>Do you really want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#4d004d" }} onClick={handleDelete}>Yes</Button>
          <Button style={{ backgroundColor: "#4d004d" }} onClick={handleClosedel}>No</Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default UsersCard;
