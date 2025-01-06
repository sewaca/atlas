package com.atlas.service;

import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.common.hash.Hashing;

@Service
public class HashService {
    @Value("${hash.salt}")

    private String salt;

    public String hash (String message) {
        return Hashing.sha256().hashString(message + salt, StandardCharsets.UTF_8).toString();
    }
}