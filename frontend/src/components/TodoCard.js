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
    width: '900px',
    padding: '0.5rem',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.25)',
    margin: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

  return ( // il componente ritorna la seguente struttura HTML
    <div style={style}> 
      <h2>{title}</h2>
      <p>{description}</p>
      <div>
        {<ButtonElement
        url={`/todos/${id}`}
        text={'Dettagli'}
        bgcolor={'#addbf0'}
        width={80}
        color={'black'}
        textAlign={'center'}
        />}
      </div>
      
    </div>
  );
}

export default TodoCard; 