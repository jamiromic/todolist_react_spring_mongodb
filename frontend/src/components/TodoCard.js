import { Link } from 'react-router-dom';

function TodoCard(props) { 
// Senza utilizzo della destrutturazione
//    const id = props.id;
//    const title = props.title;
//    const description = props.description;

// Con utilizzo della destrutturazione, il codice risulta molto più sintetico
  const { id, title, description } = props;

  const style = {
    width: '300px',
    height: '300px',
    padding: '0.5rem',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.25)',
    margin: '0.75rem',
    display: 'flex',
    flexDirection: 'column'
  };

  const titleStyle = {
    height: '100px',
    overflow: 'auto',
    fontSize: '28px',
    padding: '10px',
    filter: 'blur(1px)',
  }

  const descriptionStyle = {
    overflowWrap: 'break-word',
    maxHeight: '300px',
    overflow: 'hidden',
    filter: 'blur(6px)',
    padding: '10px'
  }


  return ( // il componente ritorna la seguente struttura HTML
  <Link to={`/todos/${id}`} style={{ ...style, textDecoration: 'none', color: 'inherit' }}>
      <h2 style={titleStyle}>{title}</h2>
      <p style={descriptionStyle}>{description}</p>
  </Link>
  );
}

export default TodoCard; 