package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repo.*;

import io.jsonwebtoken.Jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private StudentRepo userRepo;

    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);
    
    
    @Autowired
    private JWTService jwtService;

    public BaseUser register(BaseUser user, String role) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        switch (role.toUpperCase()) {
            case "STUDENT":
                return userRepo.save((Student) user);
            case "TEACHER":
                return teacherRepo.save((Teacher) user);
            case "ADMIN":
                return adminRepo.save((Admin) user);
            default:
                throw new IllegalArgumentException("Invalid role: " + role);
        }
    }

    public String login(String email, String password, String role) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email, password)
        );
        if (authentication.isAuthenticated()) {
        	
        	
            return jwtService.generateToken(email);
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
