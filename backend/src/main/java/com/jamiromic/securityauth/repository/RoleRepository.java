package com.jamiromic.securityauth.repository;

import java.util.Optional;

import com.jamiromic.securityauth.models.ERole;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.jamiromic.securityauth.models.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
