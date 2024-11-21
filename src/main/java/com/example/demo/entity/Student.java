package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Document(collection = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student extends BaseUser {
    private String phone;
    private String address;

    // Constructor to initialize Student with the required fields
    public Student(String id, String name, String password, String email, String phone, String address) {
        super(id, name, password, email);
        this.phone = phone;
        this.address = address;
    }
}
