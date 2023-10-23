package com.jamiromic.todos.repository;

import com.jamiromic.todos.models.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TodoRepository extends MongoRepository<Todo, Long> {

}
