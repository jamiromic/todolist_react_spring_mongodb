package com.jamiromic.todos.controllers;

import com.jamiromic.todos.models.Todo;
import com.jamiromic.todos.services.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;

@RestController
@CrossOrigin
@RequestMapping("/api/auth/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    private static final Logger logger = (Logger) LoggerFactory.getLogger(TodoService.class);



    @Operation(summary = "Recupera lista dei ToDo filtrata per utente")
    @GetMapping("/")
    public Optional<List<Todo>> getByUserId()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        logger.debug("Recupero lista ToDo utente attualmente loggato");
        return todoService.getByUserId(userId);
    }


    @Operation(summary = "Recupera ToDo tramite ID")
    @GetMapping("/{id}")
    public Optional<Todo> getById(
            @PathVariable(value = "id") Long id)
    {
        logger.debug("Recupero ToDo tramite ID");
        return todoService.getById(id);
    }


    @Operation(summary = "Salva nel DB un nuovo ToDo")
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Todo createStud(@RequestBody Todo todo)
    {
        logger.debug("Creo ToDo");
        return todoService.createTodo(todo);
    }


    @Operation(summary = "Modifica ToDo")
    @PutMapping("/update/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Todo updateTodo(
            @PathVariable Long id,
            @RequestBody Todo updateTodoRequest
    )
    {
        logger.debug("Modifico ToDo");
        return todoService.updateTodo(id, updateTodoRequest.getTitle(), updateTodoRequest.getDescription());
    }


    @Operation(summary = "Eliminazione ToDo")
    @DeleteMapping("/delete/{id}")
    public void deleteTodo(@PathVariable Long id)
    {
        logger.debug("Elimino ToDo");
        todoService.deleteById(id);
    }


}
