package com.vatunisia.soh.user.service;

import com.vatunisia.soh.user.dto.UserDTO;
import com.vatunisia.soh.user.entity.User;
import com.vatunisia.soh.user.mapper.UserMapper;
import com.vatunisia.soh.user.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public UserDTO addUser(UserDTO userDTO) {
        User userToSave = UserMapper.mapToUser(userDTO);
        User savedUser = userRepo.save(userToSave);
        return UserMapper.mapToUserDTO(savedUser);
    }

    public ResponseEntity<UserDTO> fetchUserDetailsById(Long userId) {
        Optional<User> fetchedUser = userRepo.findById(userId);
        if(fetchedUser.isPresent())
            return new ResponseEntity<>(UserMapper.mapToUserDTO(fetchedUser.get()), HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
}
