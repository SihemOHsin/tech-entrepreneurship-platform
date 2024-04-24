package com.vatunisia.soh.Authentication.auth;

import com.vatunisia.soh.Authentication.user.User;
import com.vatunisia.soh.Authentication.user.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthenticationService service;
    private final UserRepository userRepository;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(
            @RequestBody @Valid RegistrationRequest request
    ) throws MessagingException {
        service.register(request);
        return ResponseEntity.accepted().build();
    }

    @GetMapping("/activate-account")
    public void confirm(
            @RequestParam String token
    ) throws MessagingException {
        service.activateAccount(token);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    // NOT USED
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // NOT USED
    @GetMapping("/entrepreneurs")
    public ResponseEntity<List<User>> getEntrepreneurs() {
        List<User> entrepreneurs = userRepository.findByRoles_Name("ENTREPRENEUR");
        return ResponseEntity.ok(entrepreneurs);
    }
    // NOT USED
    @GetMapping("/it-experts")
    public ResponseEntity<List<User>> getItExperts() {
        List<User> itExperts = userRepository.findByRoles_Name("ITEXPERT");
        return ResponseEntity.ok(itExperts);
    }

    //GENERIC ONE USED IN BUSINESS
    @GetMapping("/role/{userRole}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String userRole) {
        // Find users by role : ENTREPRENEUR / ITEXPERT
        List<User> usersWithRole = userRepository.findByRoles_Name(userRole);
        return ResponseEntity.ok(usersWithRole);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Integer userId) {
        // Find user by ID
        Optional<User> optionalUser = userRepository.findById(userId);

        // Check if user exists
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return ResponseEntity.ok(user);
        } else {
            // Return 404 Not Found if user is not found
            return ResponseEntity.notFound().build();
        }
    }

}