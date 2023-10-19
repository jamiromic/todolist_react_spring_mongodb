package appstudents.example.students.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import appstudents.example.students.models.Student;
import appstudents.example.students.repository.StudentRepository;

@Service
public class StudentService {
	
	@Autowired
	StudentRepository studentRepository;
	
	public List<Student> getAll() {
		return studentRepository.findAll();
	}
	
	public java.util.Optional<Student> getById(Long id) {
		return studentRepository.findById(id);
	}
	
	
	public Student createStud(Student student) {
		return studentRepository.save(student);
	}
	
	public Student updateStudent(Student updatedStudent) {
	    java.util.Optional<Student> existingStudent = studentRepository.findById(updatedStudent.getId());
	    Student studentToUpdate = existingStudent.get();
        studentToUpdate.setName(updatedStudent.getName());
        studentToUpdate.setSurname(updatedStudent.getSurname());
        studentToUpdate.setAge(updatedStudent.getAge());
        studentToUpdate.setEmail(updatedStudent.getEmail());

	        return studentRepository.save(studentToUpdate);
	}
	
	public void delete(Student student) {
        studentRepository.delete(student);
    }
    
    public void deleteById(Long id) {
        studentRepository.deleteById(id);
    }
	
	

}
