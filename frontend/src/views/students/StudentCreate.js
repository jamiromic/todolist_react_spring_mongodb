import React, { useState } from 'react';
import ButtonElement from '../../components/ButtonElement';
import validator from 'validator';
import AuthService from '../../services/auth.service';

function StudentCreate() {
  // Definiamo uno stato iniziale per lo studente con nome e età vuoti
  const [student, setStudent] = useState({
    name: '',
    surname: '',
    age: 0,
    email: ''
  });

  // Questa funzione gestisce la modifica degli input del form
  const handleInputChange = event => {
    // Estrapoliamo il nome e il valore dell'input dalla proprietà "target" dell'evento
    const { name, value } = event.target;
    // Aggiorniamo lo stato dello studente con il nuovo valore dell'input
    setStudent(prevState => ({ ...prevState, [name]: value }));
  };

  // Questa funzione gestisce il submit del form
  const handleSubmit = event => {
    // Impediamo il comportamento predefinito del form, che è quello di ricaricare la pagina
    event.preventDefault();

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
    // Stampa a console lo stato corrente dello studente
    console.log(student);
    const currentUser = AuthService.getCurrentUser();
    // Inviamo una richiesta POST al server per creare uno studente
    fetch('http://localhost:8080/api/auth/students/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${currentUser.accessToken}`
  },
  body: JSON.stringify(student)
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
    // Redirect alla lista degli studenti dopo la creazione di uno studente
    window.location.href = '/students';
  };

  // Questo è il markup del form
  return (
    <div>
      <ButtonElement 
      text='Torna alla lista degli studenti'
      url='/students'
      bgcolor='#7fe37f'
      color='black'
      />
    <form className='d-flex flex-column align-items-center' onSubmit={handleSubmit}>
      <label htmlFor="name">Nome</label>
      <input
        style={{width: '300px'}}
        type="text"
        id="name"
        name="name"
        value={student.name}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="surname">Cognome</label>
      <input
        style={{width: '300px'}}
        type="text"
        id="surname"
        name="surname"
        value={student.surname}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="age">Età</label>
      <input
        style={{width: '300px'}}
        type="number"
        id="age"
        name="age"
        value={student.age}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="email">Email</label>
      <input
        style={{width: '300px'}}
        type="email"
        id="email"
        name="email"
        value={student.email}
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

export default StudentCreate;
