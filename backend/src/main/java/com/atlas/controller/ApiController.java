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
@RequestMapping("/api")
public class ApiController {

    @RequestMapping("/health") 
    public String apicheck () {
        return "ok";
    }
}