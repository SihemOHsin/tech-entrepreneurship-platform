package com.vatunisia.soh.Authentication.role;

import com.vatunisia.soh.Authentication.role.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String roleBusiness);
}
