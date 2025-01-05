package com.atlas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atlas.constant.Role;
import com.atlas.model.Headers;
import com.atlas.model.User;
import com.atlas.service.JwtService;
import com.atlas.types.SignInRequest;
import com.atlas.types.SignUpRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private final JwtService jwtService;

    @RequestMapping(path = "/login", method=org.springframework.web.bind.annotation.RequestMethod.POST)
    public String login(@RequestBody SignInRequest request){
        // TODO: check if user really exists and creds are correct
        return Headers.BEARER+jwtService.issueToken(User.builder().username(request.getUsername()).id(1L).role(Role.ADMIN).build());
    }

    @RequestMapping(path = "/register", method=org.springframework.web.bind.annotation.RequestMethod.POST)
    public String register(@RequestBody SignUpRequest request){
        // TODO: create user in db && add side checks 
        return Headers.BEARER+jwtService.issueToken(User.builder().username(request.getUsername()).id(1L).role(Role.ADMIN).build());
    }
}