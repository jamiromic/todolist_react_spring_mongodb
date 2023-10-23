package com.jamiromic.todos.services;

import com.jamiromic.todos.models.Todo;
import com.jamiromic.todos.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TodoService {

    @Autowired
    TodoRepository todoRepository;

    private AtomicLong idCounter = new AtomicLong(1);

    public List<Todo> getAll() {
        return todoRepository.findAll();
    }

    public Optional<Todo> getById(Long id) {
        return todoRepository.findById(id);
    }

    public Todo createTodo(Todo todo) {
        Long nextId = idCounter.getAndIncrement();
        todo.setId(nextId);
        return todoRepository.save(todo);
    }

    public void deleteById(Long id) {
        todoRepository.deleteById(id);
    }


}
