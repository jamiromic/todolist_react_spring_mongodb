import React, { useState, useEffect } from 'react';
import StudentCard from '../../components/StudentCard';
import ButtonElement from '../../components/ButtonElement';
import authService from '../../services/auth.service';


function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      window.location.href = "/login";
      return;
    }
    fetch('http://localhost:8080/api/auth/students/', {
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => setStudents(data))
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
        text='Crea un nuovo Studente'
        url='/students/create'
        bgcolor='rgb(255, 127, 127)'
        color='black'
      />
      <h1 style={{
        backgroundImage: 'linear-gradient(rgb(255, 232, 127), rgb(255, 127, 127))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        marginBottom: '2rem'
      }}>App Students</h1>
      <div className='d-flex justify-content-center'>
      {students.map(student => (
          <StudentCard
            key={student.id}
            id={student.id}
            name={student.name}
            surname={student.surname}
            age={student.age}
            email={student.email}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentList;
