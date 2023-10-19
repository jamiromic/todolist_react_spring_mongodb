package appstudents.example.students.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import appstudents.example.students.models.Student;
import appstudents.example.students.services.StudentService;

@RestController
@CrossOrigin
@RequestMapping("/api/auth/students")
public class StudentController {
	
	//Questa è una dependencyInjection in cui iniettiamo nella classe StudentController un istanza della classe
	//StudentRepository
	@Autowired
    private StudentService studentService;
  
    // Get All Students
    @GetMapping("/")
    public List<Student> getAll()
    {
        return studentService.getAll();
    }
  
    // Get the student details by
    // ID
    @GetMapping("/{id}")
    public Optional<Student> getById(
        @PathVariable(value = "id") Long id)
    { 	
        return studentService.getById(id);
    }
    
    @PutMapping("update/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable(value = "id") Long id, @RequestBody Student updatedStudent) {
            Student student = studentService.updateStudent(updatedStudent);
            return ResponseEntity.ok(student);
    }
  
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Student createStud(@RequestBody Student student){
        return studentService.createStud(student);
    }
      
    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable Long id) {
    	studentService.deleteById(id);
    	
    }

}
