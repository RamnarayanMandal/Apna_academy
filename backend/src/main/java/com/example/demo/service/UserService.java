package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repo.*;

import io.jsonwebtoken.Jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
  private StudentRepo studentRepo;
    
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
//    public ResponseEntity<String> login(String email, String password, String role) {
//        // Fetch the student by email from the repository
//        Student student = studentRepo.findByEmail(email);
//
//        if (student == null) {
//            return ResponseEntity.status(401).body("Invalid credentials");
//        }
//
//        // Check if the student is blocked
//        if (student.getBlock()) {
//            return ResponseEntity.status(403).body("Your account is blocked. Please contact the administrator.");
//        }
//
//        // Authenticate the user using the AuthenticationManager
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(email, password)
//        );
//
//        // Check if authentication is successful
//        if (authentication.isAuthenticated()) {
//            // Generate JWT token
//            String token = jwtService.generateToken(email);
//            return ResponseEntity.ok(token);  // Return the token in the response
//        } else {
//            return ResponseEntity.status(401).body("Invalid credentials");
//        }
//    }
public String login(String email, String password, String role) {
    System.out.println("Attempting login for user: " + email);

    if(role.equals("student")) {
        Student student = studentRepo.findByEmail(email);
        if (student != null) {
            System.out.println("Student found: " + student.getEmail() + ", Block status: " + student.getBlock());
        }

        // If blocked, return the blocked message
        if (student != null && student.getBlock() && "student".equals(role)) {
            return "Your account is blocked. Please contact the administrator.";
        }
    }

    // Proceed with authentication if not blocked
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
