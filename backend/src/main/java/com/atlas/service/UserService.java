package com.atlas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atlas.model.User;
import com.atlas.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public User findByUsername(String username) {
        return repository.findByUsername(username);
    }

    public boolean isUserExists (String username) {
        return repository.findByUsername(username) != null;
    }

    public User create(User newUser) {
        if (isUserExists(newUser.getUsername())) return null;
        return repository.save(newUser);
    }

}