package com.vatunisia.soh.user.controller;


import com.vatunisia.soh.user.dto.UserDTO;
import com.vatunisia.soh.user.service.UserService;
import com.vatunisia.soh.user.dto.UserDTO;
import com.vatunisia.soh.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/addUser")
    public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO userDTO){
        UserDTO savedUser =  userService.addUser(userDTO);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> fetchUserDetailsById(@PathVariable Long userId){
        return userService.fetchUserDetailsById(userId);
    }



}
