package com.vatunisia.soh.user.mapper;

import com.vatunisia.soh.user.dto.UserDTO;
import com.vatunisia.soh.user.entity.User;

public class UserMapper {

    public static UserDTO mapToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setUserName(user.getUserName());
        userDTO.setUserPassword(user.getUserPassword());
        userDTO.setAddress(user.getAddress());
        userDTO.setCity(user.getCity());
        return userDTO;
    }

    public static User mapToUser(UserDTO userDTO) {
        User user = new User();
        user.setUserId(userDTO.getUserId());
        user.setUserName(userDTO.getUserName());
        user.setUserPassword(userDTO.getUserPassword());
        user.setAddress(userDTO.getAddress());
        user.setCity(userDTO.getCity());
        return user;
    }
}
