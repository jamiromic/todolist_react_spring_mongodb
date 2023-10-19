package appstudents.example.students.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import appstudents.example.students.models.Student;

public interface StudentRepository extends JpaRepository<Student,
Long> {
	
}
