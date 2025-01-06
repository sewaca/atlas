package com.atlas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atlas.constant.Role;
import com.atlas.model.User;

@Service
public class AuthService {
    @Autowired
    private UserService userService;

    @Autowired
    private HashService hashService;

    public User getUserByUsername (String username) {
       return userService.findByUsername(username);
    }

    

    public boolean authenticate(String username, String password) {
        if (!userService.isUserExists(username)) return false;

        User user = userService.findByUsername(username);
        String hashedPassword = hashService.hash(password);

        return user.getPassword().equals(hashedPassword);
    }
    
    public User createUser(String username, String password) {
        String hashedPassword = hashService.hash(password);
        String role = Role.USER;

        User newUser = User.builder()
            .username(username)
            .password(hashedPassword)
            .role(role)
            .build();
        
        return userService.create(newUser);
    }
}