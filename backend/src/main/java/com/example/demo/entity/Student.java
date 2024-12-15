package com.example.demo.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

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
    @CreatedDate
    private LocalDateTime createdAt;  // Created timestamp

    @LastModifiedDate
    private LocalDateTime updatedAt;  // Last modified timestamp

    // Constructor to initialize Student with the required fields


    public Student(String id, String name, String password, String email, Boolean block, String phone, String address, String profilePicture, String dateOfBirth, String gender, LocalDateTime createdAt, LocalDateTime updatedAt) {
        super(id, name, password, email, block);
        this.phone = phone;
        this.address = address;
        this.profilePicture = profilePicture;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Student{" +
                "phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", profilePicture='" + profilePicture + '\'' +
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
