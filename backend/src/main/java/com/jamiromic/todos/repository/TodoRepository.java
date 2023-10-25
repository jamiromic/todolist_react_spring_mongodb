package com.jamiromic.todos.repository;

import com.jamiromic.todos.models.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends MongoRepository<Todo, Long> {
    @Query("{'userId': ?0}")
    Optional<List<Todo>> findByUserId(String userId);

}
