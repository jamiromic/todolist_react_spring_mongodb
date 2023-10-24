package com.jamiromic.todos.controllers;

import com.jamiromic.todos.models.Todo;
import com.jamiromic.todos.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/auth/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/")
    public List<Todo> getAll()
    {
        return todoService.getAll();
    }

    @GetMapping("/{id}")
    public Optional<Todo> getById(
            @PathVariable(value = "id") Long id)
    {
        return todoService.getById(id);
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Todo createStud(@RequestBody Todo todo){
        return todoService.createTodo(todo);
    }

    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Todo updateTodo(
            @PathVariable Long id,
            @RequestBody Todo updateTodoRequest
    ) {
        return todoService.updateTodo(id, updateTodoRequest.getTitle(), updateTodoRequest.getDescription());
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteById(id);

    }

}
