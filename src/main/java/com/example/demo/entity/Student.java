package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Document(collection = "student")
@Getter
@Setter
@NoArgsConstructor
public class Student extends BaseUser {
    private String about;

    // Constructor
    public Student(String id, String name, String password, String email, String about) {
        super(id, name, password, email);
        this.about = about;
    }

    
}
