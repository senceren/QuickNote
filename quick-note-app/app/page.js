'use client';
import Image from 'next/image'
import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Row, Container, ListGroup, ListGroupItem, Form, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import axios from 'axios';


export default function Home() {

  const apiUrl = "https://localhost:7058/api/Notes";
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const itemClicked = function (e, note) {
    setSelectedNote(note);
  };

  const addNewNote = (e) => {
    const newNote = {
      title: "New Note",
      content: ""
    };
    axios.post(apiUrl, newNote).then(function (response) {
      setNotes([...notes, response.data]);
      setSelectedNote(response.data);
    });
  };


  return (
    <main className={styles.main}>
      <NavigationBar />
      <Container>
        <Row>
          <Col md={4} lg={3} sm={5}>
            <div className='d-flex justify-content-end'>
              <Button className='mt-2'> <FontAwesomeIcon icon={faPlus} onClick={addNewNote} /> </Button>
            </div>
            <ListGroup className="mt-2">
              {/* item a tıklandığında idsi ile birlikte evente gönder */}
              {
                notes.map(note => (
                  <ListGroupItem key={note.id}
                    onClick={(e) => itemClicked(e, note)} action active={note == selectedNote}>
                    {note.title}
                  </ListGroupItem>))
              }
            </ListGroup>
          </Col>
          <Col md={8} lg={9} sm={7}>
            <div className="mt-3">
              <Form.Control placeholder='Title' value={selectedNote?.title} />
            </div>
            <div className="mt-2">
              <Form.Control as="textarea" placeholder='Your note..' rows={10} value={selectedNote?.content} />
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />

    </main>
  );
}
