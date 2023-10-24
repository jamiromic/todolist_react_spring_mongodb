import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ButtonElement from '../../components/ButtonElement';
import AuthService from '../../services/auth.service';
import {BACKEND_URL} from '../../config';

function TodoDetails() { 
  const { id } = useParams(); // ottiene l'ID del toDo dalla URL utilizzando il hook useParams()

  const [todo, setTodo] = useState(null); // definisce uno stato per contenere le informazioni sul Todo

  // Recupera le informazioni sul ToDo dalle API utilizzando l'ID, utilizzando il hook useEffect()
  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }
    fetch(`${BACKEND_URL}${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => setTodo(data))
      .catch(error => console.log(error));
  }, [id]);

  // Se le informazioni sul ToDO non sono ancora state recuperate, mostra un messaggio di caricamento
  if (!todo) {
    return <p>Caricamento in corso...</p>;
  }

  // Definisce le funzioni per eliminare un ToDo
  function handleDelete(event) {
    const idItem = event.target.id;
    fetch(`${BACKEND_URL}delete/${idItem}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
      window.location.href = '/todos/';
  }
  // Definisce le funzioni per aggiornare un ToDo
  function handleUpdate(event) {
    const idItem = event.target.id;
    window.location.href = '/todos/update/' + idItem;
  }

  // Mostra le informazioni sul ToDo e i pulsanti per eliminare e aggiornare il ToDo
  return (
    <div>
      <ButtonElement
      text='Torna alla lista dei ToDo'
      url='/todos'
      bgcolor='#7fe37f'
      color='black'
      />
      <div className='d-flex align-content-center flex-column text-center mt-5'> 
        <h1>{todo.title}</h1> 
        <p>{todo.description}</p>
        <div className='d-flex justify-content-center'>
          <ButtonElement
            text='Modifica'
            id={todo.id}
            onClick={handleUpdate}
            bgcolor='#3780ec'
            color='white'
            width={100}
          />
          <ButtonElement
            text='Delete'
            id={todo.id}
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

export default TodoDetails;
