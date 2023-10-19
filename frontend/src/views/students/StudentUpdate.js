import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ButtonElement from "../../components/ButtonElement";
import validator from 'validator';
import authService from "../../services/auth.service";



function StudentUpdate() {

  // Definiamo l'URL base delle API RESTful
  const base_url = 'http://localhost:8080/api/auth/students/';
  // Estraiamo l'id dello studente dalla URL tramite il hook useParams di React Router
  const { id } = useParams();
  // Definiamo lo stato iniziale dello studente con id, nome, cognome, eta, email vuoti
  const [student, setStudent] = useState({ id: id, name: "", surname: "", age: "", email: "" });

  // Questo effetto si attiva al caricamento del componente e carica i dati dello studente dal server
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }
  
    fetch(`http://localhost:8080/api/auth/students/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Aggiorniamo lo stato dello studente con i dati ricevuti dal server
        setStudent(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  // Queste funzioni gestiscono la modifica degli input del form
  const handleNameChange = event => {
    setStudent({ ...student, name: event.target.value });
  };

  const handleSurnameChange = event => {
    setStudent({ ...student, surname: event.target.value });
  };

  const handleAgeChange = event => {
    setStudent({ ...student, age: event.target.value });
  };

  const handleEmailChange = event => {
    setStudent({ ...student, email: event.target.value });
  };

  // Questa funzione gestisce il submit del form
  const handleSubmit = event => {

    // Controllo che i dati obbligatori siano stati inseriti
  if (!student.name || !student.surname || !student.age || !student.email) {
    alert('Inserisci tutti i dati obbligatori');
    return;
  }

  // Controllo che l'indirizzo email inserito sia valido
  if (!validator.isEmail(student.email)) {
    alert('Inserisci un indirizzo email valido');
    return;
  }
    // Impediamo il comportamento predefinito del form, che è quello di ricaricare la pagina
    event.preventDefault();

    // Inviamo una richiesta PUT al server per aggiornare i dati dello studente
    fetch(`${base_url}update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    })
      .then(response => {
        // Se la richiesta ha avuto successo, torniamo alla lista degli studenti
        if (response.ok) {
          window.location.href = '/students';
        } else {
          throw new Error("Failed to update student");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Questo è il markup del form
  return (
    <div>
      <h1 className="text-center p-5">Update Student</h1>
      <form className=" d-flex flex-column text-center" onSubmit={handleSubmit}>
        <div>
          <label style={{width: '80px'}} htmlFor="name">Name: </label>
          <input required type="text" id="name" value={student.name} onChange={handleNameChange} />
        </div>
        <div>
          <label style={{width: '80px'}} htmlFor="surname">Cognome: </label>
          <input required type="text" id="surname" value={student.surname} onChange={handleSurnameChange} />
        </div>
        <div>
          <label style={{width: '80px'}} htmlFor="age">Age: </label>
          <input required type="number" id="age" value={student.age} onChange={handleAgeChange} />
        </div>
        <div>
          <label style={{width: '80px'}} htmlFor="email">E-Mail: </label>
          <input required type="email" id="email" value={student.email} onChange={handleEmailChange} />
        </div>
        <div className="pt-3">
          <ButtonElement
          type='submit'
          text='Modifica'
          onClick={handleSubmit}
          color='black'
          bgcolor='#3780ec'
          />
          <ButtonElement
          url={`/students/${student.id}`}
          text='Annulla'
          bgcolor='#d76565'
          color='black'
          />
        </div>
      </form>
    </div>
  );
}

export default StudentUpdate;


