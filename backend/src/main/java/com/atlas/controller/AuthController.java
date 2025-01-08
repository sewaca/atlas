package com.atlas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atlas.constant.Headers;
import com.atlas.model.User;
import com.atlas.service.AuthService;
import com.atlas.service.JwtService;
import com.atlas.service.UserService;
import com.atlas.types.SignInRequest;
import com.atlas.types.SignUpRequest;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private final JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestBody SignInRequest request, HttpServletResponse response){
        if (!authService.authenticate(request.getUsername(), request.getPassword())) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return "not found";
        }
        
        return "\""+Headers.BEARER+jwtService.issueToken(userService.findByUsername(request.getUsername()))+"\"";
    }

    @PostMapping("/register")
    public String register(@RequestBody SignUpRequest request, HttpServletResponse response){
        User created = authService.createUser(request.getUsername(), request.getPassword());

        if (created == null) {
            response.setStatus(HttpServletResponse.SC_CONFLICT);
            return "user exists";
        }
        
        return "\""+Headers.BEARER+jwtService.issueToken(created)+"\"";
    }
}