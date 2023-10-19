import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ButtonElement from '../../components/ButtonElement';
import AuthService from '../../services/auth.service';

function StudentDetails() { 
  const { id } = useParams(); // ottiene l'ID dello studente dalla URL utilizzando il hook useParams()

  const [student, setStudent] = useState(null); // definisce uno stato per contenere le informazioni sullo studente

  // Recupera le informazioni sullo studente dalle API utilizzando l'ID, utilizzando il hook useEffect()
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
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
      .then(data => setStudent(data))
      .catch(error => console.log(error));
  }, [id]);

  // Se le informazioni sullo studente non sono ancora state recuperate, mostra un messaggio di caricamento
  if (!student) {
    return <p>Caricamento in corso...</p>;
  }

  // Definisce le funzioni per eliminare uno studente
  function handleDelete(event) {
    const idItem = event.target.id;
    fetch('http://localhost:8080/api/auth/students/delete/' + idItem, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
      window.location.href = '/students/';
  }
  // Definisce le funzioni per aggiornare uno studente
  function handleUpdate(event) {
    const idItem = event.target.id;
    window.location.href = '/students/update/' + idItem;
  }

  // Mostra le informazioni sullo studente e i pulsanti per eliminare e aggiornare lo studente
  return (
    <div>
      <ButtonElement
      text='Torna alla lista degli studenti'
      url='/students'
      bgcolor='#7fe37f'
      color='black'
      />
      <div className='d-flex align-content-center flex-column text-center mt-5'> 
        <h1>{student.name} {student.surname}</h1> 
        <p><strong>Età: </strong>{student.age}</p>
        <p><strong>Email: </strong>{student.email}</p>
        <div className='d-flex justify-content-center'>
          <ButtonElement
            text='Modifica'
            id={student.id}
            onClick={handleUpdate}
            bgcolor='#3780ec'
            color='white'
            width={100}
          />
          <ButtonElement
            text='Delete'
            id={student.id}
            onClick={handleDelete}
            bgcolor='#d76565'
            color='white'
            width={100}
          />
        </div>
        
      </div>
    </div>
  );
}

export default StudentDetails; 
