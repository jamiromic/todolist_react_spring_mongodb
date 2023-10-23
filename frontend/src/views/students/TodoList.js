import React, { useState, useEffect } from 'react';
import StudentCard from '../../components/TodoCard';
import ButtonElement from '../../components/ButtonElement';
import authService from '../../services/auth.service';


function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }
    fetch('http://localhost:8080/api/auth/todos/', {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.log(error));
  },[]);

  return (
    
    <div>
      <ButtonElement
        text='Torna alla Home'
        url='/'
        bgcolor='rgb(255, 232, 127)'
        color='black'
      />
      <ButtonElement
        text='Crea un nuovo To Do'
        url='/todos/create'
        bgcolor='rgb(255, 127, 127)'
        color='black'
      />
      <h1 style={{
        backgroundImage: 'linear-gradient(rgb(255, 232, 127), rgb(255, 127, 127))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>App ToDoList</h1>
      <div className='d-flex justify-content-center'>
      {todos.map(todo => (
          <StudentCard
            key={todo.id}
            id={todo.id}
            title={todo.title}
            description={todo.description}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
