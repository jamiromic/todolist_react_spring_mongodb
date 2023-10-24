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

    public Todo updateTodo(Long id, String title, String description) {
        Optional<Todo> existingTodo = todoRepository.findById(id);

        if (existingTodo.isPresent()) {
            Todo todo = existingTodo.get();
            todo.setTitle(title);
            todo.setDescription(description);
            return todoRepository.save(todo);
        } else {
            throw new IllegalArgumentException("Todo not found");
        }
    }

    public void deleteById(Long id) {
        todoRepository.deleteById(id);
    }


}
