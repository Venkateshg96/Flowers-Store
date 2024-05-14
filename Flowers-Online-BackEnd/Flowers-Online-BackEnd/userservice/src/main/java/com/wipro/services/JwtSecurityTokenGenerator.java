package com.wipro.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.wipro.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtSecurityTokenGenerator {
	public Map<String, String> generateToken(User u) {
        String jwtToken = "";
        jwtToken =  Jwts.builder()
		.setIssuedAt(new Date())
		.setSubject(u.getEmail())
		.signWith(SignatureAlgorithm.HS256,"wipro")
		.compact();
        
        Map<String, String> map = new HashMap<>();
		map.put("token", jwtToken);
		map.put("message", "User successfully logged in");
		return map;
    }

}
