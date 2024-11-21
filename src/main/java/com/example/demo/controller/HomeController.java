package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class HomeController {

    @GetMapping("/")
    public String greet() {
        System.out.println("Hello Ramnarayan Mandal");
        return "Welcome to Apna Academy";
    }
}
