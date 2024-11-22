package com.example.demo.controller;
import com.example.demo.dto.AuthDTO;
import com.example.demo.entity.UserPrincipal;
import com.example.demo.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.BaseUser;
import com.example.demo.service.UserService;
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService authService;



    @PostMapping("/register")
    public BaseUser register(@RequestBody BaseUser user, @RequestParam String role) {
    	System.out.println(user);
    	System.out.println("role"+role);
    	
        return authService.register(user, role);
    }

    @PostMapping("/login")
    public String login(@RequestBody BaseUser user, @RequestParam String role) {
    	System.out.println(user);
    	System.out.println("role" +role);
        return authService.login(user.getEmail(), user.getPassword(), role);
    }


    @GetMapping("/profile")
    public BaseUser getUserProfile(@AuthenticationPrincipal UserPrincipal userDetails) {
        return  userDetails.getUser();
    }
}
