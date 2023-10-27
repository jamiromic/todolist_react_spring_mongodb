import React, { useState, useEffect } from 'react';
import ButtonElement from '../../components/ButtonElement';
import authService from '../../services/auth.service';
import TodoCard from '../../components/TodoCard';
import { BACKEND_URL } from '../../config';


function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }
    fetch(BACKEND_URL, {
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
        text='Crea un nuovo ToDo'
        url='/todos/create'
        bgcolor='rgb(255, 127, 127)'
        color='black'
      />
      <h1 style={{
        color: 'black',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>ToDo List</h1>
      <div className='d-flex justify-content-center align-items-center flex-wrap'>
      {todos.map(todo => (
          <TodoCard
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
