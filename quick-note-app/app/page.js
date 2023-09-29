'use client';
import Image from 'next/image'
import styles from './page.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Row, Container, ListGroup, ListGroupItem, Form, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
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
      toast("New note created.");
    });
  };

  const deleteNote = (e) => {
    axios.delete(apiUrl + "/" + selectedNote.id)
      .then(function (response) {
        setNotes(notes.filter(n => n.id != selectedNote.id));
        toast("Note deleted.");
      });
  }

  const saveNote = (e) => {
    axios.put(apiUrl + "/" + selectedNote.id, selectedNote)
      .then(function (response) {
        const newNotes = [...notes]; // notun klonu alındı
        let i = newNotes.findIndex(n => n.id == selectedNote.id); // seçili notun idsini aldık
        newNotes[i] = selectedNote;  // yeni notların seçili indeksli olanını değiştirdki.
        setNotes(newNotes);   // durum değişkinini doğrudan değiştirmiyoruz hiçbir zaman. kopyasını alıyoruz. set le yeni veriyi veriyoruz.
        toast("Note updated.");
      });
  };



  return (
    <main className={styles.main}>
      <NavigationBar />
      <Container>
        <Row>
          <Col md={4} lg={3} sm={5}>
            <div className='d-flex justify-content-end'>
              <Button className='mt-2' onClick={addNewNote}> <FontAwesomeIcon icon={faPlus} /> </Button>
            </div>
            <ListGroup className="mt-2">
              {/* item a tıklandığında idsi ile birlikte evente gönder */}
              {
                notes.map(note => (
                  <ListGroupItem key={note.id}
                    onClick={(e) => itemClicked(e, note)} action active={note.id == selectedNote?.id}>
                    {note.title}
                  </ListGroupItem>))
              }
            </ListGroup>
          </Col>
          <Col md={8} lg={9} sm={7}>
            <div className="mt-3">
              <Form.Control placeholder='Title' value={selectedNote?.title}
                onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })} />
            </div>
            <div className="mt-2">
              <Form.Control as="textarea" placeholder='Your note..' rows={10} value={selectedNote?.content}
                onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })} />
            </div>
            <div className='mt-2'>
              <Button onClick={saveNote} variant="success" className='me-2' > <FontAwesomeIcon icon={faSave} /> </Button>
              <Button onClick={deleteNote} variant="danger" > <FontAwesomeIcon icon={faTrash} /> </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer autoClose={1000} />

    </main>
  );
}
