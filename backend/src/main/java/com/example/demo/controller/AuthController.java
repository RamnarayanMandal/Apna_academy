package com.example.demo.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.BaseUser;
import com.example.demo.service.UserService;

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
}
