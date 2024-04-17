package com.vatunisia.soh.Authentication;

import com.vatunisia.soh.Authentication.role.Role;
import com.vatunisia.soh.Authentication.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class AuthenticationApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthenticationApplication.class, args);
	}

	//just to initialize the roles inside user table :
	@Bean
	public CommandLineRunner runner(RoleRepository roleRepository) {
		return args -> {
			if (roleRepository.findByName("USER").isEmpty()) {
				roleRepository.save(Role.builder().name("USER").build());
			}
		};
	}
}

	/*
	public CommandLineRunner runner(RoleRepository roleRepository) {
		return args -> {
			initializeRoleIfNotExists(roleRepository, "ADMIN");
			initializeRoleIfNotExists(roleRepository, "ENTREPRENEUR");
			initializeRoleIfNotExists(roleRepository, "ITEXPERT");
		};
	}

	private void initializeRoleIfNotExists(RoleRepository roleRepository, String roleName) {
		if (roleRepository.findByName(roleName).isEmpty()) {
			roleRepository.save(Role.builder().name(roleName).build());
		}
	}
}
*/
