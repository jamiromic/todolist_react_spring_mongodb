package appstudents.example.security.repository;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import appstudents.example.security.models.ERole;
import appstudents.example.security.models.Role;


@SuppressWarnings("unused")
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
