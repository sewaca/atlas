package com.atlas.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthController {

    @RequestMapping("/check")
    public String checkHealth(){
        return "ok";
    }
    
    @RequestMapping("/check2")
    public String checkHealth2(){
        return "ok";
    }
}