package com.jamiromic.todos.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Data
@Document(collection = "todos")
public class Todo {

    @Id
    private Long id;
    private String userId;
    private String title;
    private String description;
    private boolean completed;

}
