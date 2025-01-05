package com.atlas.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import com.atlas.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Service
@PropertySource("classpath:application.properties")
public class JwtService {
    // FIXME: can't use @Value here. Getting null instead of values :(
    // @Value("${jwt.signing.key}")
    private final String jwtSigningKey = "signingkeyshouldbesettedupforaproductionenvironment";

    // @Value("${jwt.key.expiration}")
    private final Long jwtEpxirationPeriod = (long) 604800000;

    @PostConstruct
    public void postConstruct () {
        System.out.println("[test] jwtSigningKey is "+jwtSigningKey);
        System.out.println("[test] jwtEpxirationPeriod is "+jwtEpxirationPeriod);
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSigningKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String issueToken(User user) {
        Date expiresAt = new Date(System.currentTimeMillis() + jwtEpxirationPeriod);
        Map<String, String> claims = new HashMap<>() {{
            put("id", user.getId().toString());
            put("role", user.getRole().toString());
            put("username", user.getUsername());
        }};
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(user.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(expiresAt)
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();        
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolvers) {
        return claimsResolvers.apply(Jwts.parser().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody());
    }

    public boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    public String getUsername(String token) {
        if (!validate(token)) return "";
        return extractClaim(token, Claims::getSubject);
    }

    public boolean validate(String token) {
        return !isTokenExpired(token) && !extractClaim(token, Claims::getSubject).isEmpty();
    }    
} 