import React from 'react';
import ButtonElement from './ButtonElement';

function TodoCard(props) { 
// Senza utilizzo della destrutturazione
//    const id = props.id;
//    const title = props.title;
//    const description = props.description;

// Con utilizzo della destrutturazione, il codice risulta molto più sintetico
  const { id, title, description } = props;

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
      <h2>{title}</h2>
      <p><strong> Testo: </strong> {description}</p>
      <ButtonElement 
      url={`/todos/${id}`}
      text={'Gestisci ToDo'}
      bgcolor={'#addbf0'}
      width={150}
      color={'black'}
      />
    </div>
  );
}

export default TodoCard; 