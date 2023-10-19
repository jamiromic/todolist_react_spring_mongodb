package appstudents.example.students.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

//Entity vuol dire che l'entità è presente nel database
@Entity
//Viene indicata la tabella di riferimento
@Table(name = "students")
public class Student {

	// Indichiamo la chiave primaria
	@Id
	@SequenceGenerator(allocationSize = 1, name = "students_seq", sequenceName = "students_seq")
	// Diciamo di generare la chiave primaria in autoincrement e unique
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "students_seq")

	@Column(name = "id")
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "surname")
	private String surname;

	@Column(name = "age")
	private int age;

	@Column(name = "email")
	private String email;

	// Constructor

	public Student() {

	}

	public Student(Long id, String name, String surname, int age, String email) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.age = age;
		this.email = email;
	}

	// Setter e Getter

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}