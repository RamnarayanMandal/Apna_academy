package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.DBRef;
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
    private String profilePicture;
    private String dateOfBirth;
    private String gender;


    // Constructor to initialize Student with the required fields


    public Student(String id, String name, String password, String email, String phone, String address, String profilePicture, String dateOfBirth, String gender) {
        super(id, name, password, email);
        this.phone = phone;
        this.address = address;
        this.profilePicture = profilePicture;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
    }

	
}
