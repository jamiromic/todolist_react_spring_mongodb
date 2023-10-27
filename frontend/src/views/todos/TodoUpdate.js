import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ButtonElement from "../../components/ButtonElement";
import authService from "../../services/auth.service";
import {BACKEND_URL} from "../../config";


function TodoUpdate() {

  // Estraiamo l'id del todo dalla URL tramite il hook useParams di React Router
  const { id } = useParams();
  // Definiamo lo stato iniziale del todo con id, title, description vuoti
  const [todo, setTodo] = useState({ id: id, title: "", description: "" });

  // Questo effetto si attiva al caricamento del componente e carica i dati del todo dal server
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
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
      .then(data => {
        // Aggiorniamo lo stato del todo con i dati ricevuti dal server
        setTodo(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  // Queste funzioni gestiscono la modifica degli input del form
  const handleNewTitleChange = event => {
    setTodo({ ...todo, title: event.target.value });
  };

  const handleNewDescriptionChange = event => {
    setTodo({ ...todo, description: event.target.value });
  };

  // Questa funzione gestisce il submit del form
  const handleSubmit = event => {
    console.log(todo);

    // Controllo che i dati obbligatori siano stati inseriti
  if (!todo.title || !todo.description) {
    alert('Inserisci tutti i dati obbligatori');
    return;
  }

    // Impediamo il comportamento predefinito del form, che è quello di ricaricare la pagina
    event.preventDefault();

    // Inviamo una richiesta PUT al server per aggiornare i dati del todo
    fetch(`${BACKEND_URL}update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo)
    })
      .then(response => {
        // Se la richiesta ha avuto successo, torniamo alla lista dei todo
        if (response.ok) {
          window.location.href = '/todos';
        } else {
          throw new Error("Failed to update todo");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Questo è il markup del form
  return (
    <div>
      <h1 className="text-center p-5">Update ToDo</h1>
      <form className=" d-flex flex-column text-center" onSubmit={handleSubmit}>
        <div>
          <label style={{width: '80px'}} htmlFor="title">Titolo: </label>
          <input required style={{width: '400px'}} type="text" id="title" value={todo.title} onChange={handleNewTitleChange} />
        </div>
        <div>
          <label style={{width: '80px'}} htmlFor="description">Testo: </label>
          <textarea rows={6} cols={50} required type="text" id="description" value={todo.description} onChange={handleNewDescriptionChange} />
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
          url={`/todos/${todo.id}`}
          text='Annulla'
          bgcolor='#d76565'
          color='black'
          />
        </div>
      </form>
    </div>
  );
}

export default TodoUpdate;


