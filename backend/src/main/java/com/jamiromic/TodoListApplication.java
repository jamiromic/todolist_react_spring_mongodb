package com.jamiromic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodoListApplication {

	private static final Logger logger = LoggerFactory.getLogger(TodoListApplication.class);

	public static void main(String[] args) {
		logger.debug("L'applicazione sta per essere avviata.");
		SpringApplication.run(TodoListApplication.class, args);
		logger.debug("L'applicazione è stata avviata con successo.");
	}

}
