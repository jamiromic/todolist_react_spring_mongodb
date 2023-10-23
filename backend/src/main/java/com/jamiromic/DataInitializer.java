package com.jamiromic;

import com.jamiromic.securityauth.models.ERole;
import com.jamiromic.securityauth.models.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initializeData(MongoTemplate mongoTemplate) {
        return args -> {
            // Inserisci i ruoli nel database
            if (!mongoTemplate.collectionExists("roles")) {
                // Inserisci i ruoli solo se la collezione "roles" non esiste già
                mongoTemplate.save(new Role(ERole.ROLE_USER));
                mongoTemplate.save(new Role(ERole.ROLE_ADMIN));
                mongoTemplate.save(new Role(ERole.ROLE_MODERATOR));
            }
        };
    }
}





