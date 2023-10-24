import React, { useState } from 'react';
import ButtonElement from '../../components/ButtonElement';
import AuthService from '../../services/auth.service';

function TodoCreate() {
  // Definiamo uno stato iniziale per il todo
  const [todo, setTodo] = useState({
    title: '',
    description: ''
  });

  // Questa funzione gestisce la modifica degli input del form
  const handleInputChange = event => {
    // Estrapoliamo il nome e il valore dell'input dalla proprietà "target" dell'evento
    const { name, value } = event.target;
    // Aggiorniamo lo stato del todo con il nuovo valore dell'input
    setTodo(prevState => ({ ...prevState, [name]: value }));
  };

  // Questa funzione gestisce il submit del form
  const handleSubmit = event => {
    // Impediamo il comportamento predefinito del form, che è quello di ricaricare la pagina
    event.preventDefault();

  // Controllo che i dati obbligatori siano stati inseriti
  if (!todo.title || !todo.description) {
    alert('Inserisci tutti i dati obbligatori');
    return;
  }

    // Stampa a console lo stato corrente del todo
    console.log(todo);
    const currentUser = AuthService.getCurrentUser();
    // Inviamo una richiesta POST al server per creare il todo
    fetch('http://localhost:8080/api/auth/todos/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${currentUser.accessToken}`
  },
  body: JSON.stringify(todo)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
    // Redirect alla lista dei todos dopo la creazione di un todo
    window.location.href = '/todos';
  };

  // Questo è il markup del form
  return (
    <div>
      <ButtonElement 
      text='Torna alla lista dei ToDo'
      url='/todos'
      bgcolor='#7fe37f'
      color='black'
      />
    <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
      <label htmlFor="title">Titolo</label>
      <input
        style={{width: '300px'}}
        type="text"
        id="title"
        name="title"
        value={todo.title}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="description">Descrizione</label>
      <input
        style={{width: '300px'}}
        type="text"
        id="description"
        name="description"
        value={todo.description}
        onChange={handleInputChange}
        required
      />
      
      <ButtonElement 
        type='submit'
        text='Crea'
        bgcolor='rgb(255, 232, 127)'
        color='black'
        onClick={handleSubmit}
      />
    </form>
    </div>
    
  )

}

export default TodoCreate;
