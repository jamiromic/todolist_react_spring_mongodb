import React from 'react';
import ButtonElement from '../components/ButtonElement';

function StudentCard(props) { 
// Senza utilizzo della destrutturazione
//    const id = props.id;
//    const name = props.name;
//    const surname = props.surname;
//    const age = props.age;
//    const email = props.email;

// Con utilizzo della destrutturazione, il codice risulta molto più sintetico
  const { id, name, surname, age, email } = props;

  const style = {
    width: '300px',
    padding: '1rem',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.25)',
    margin: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

  return ( // il componente ritorna la seguente struttura HTML
    <div style={style}> 
      <h2>{name} {surname}</h2>
      <p><strong> Età: </strong> {age}</p>
      <p><strong> Email: </strong> {email}</p>
      <ButtonElement 
      url={`/students/${id}`}
      text={'Gestisci Studente'}
      bgcolor={'#addbf0'}
      width={150}
      color={'black'}
      />
    </div>
  );
}

export default StudentCard; 