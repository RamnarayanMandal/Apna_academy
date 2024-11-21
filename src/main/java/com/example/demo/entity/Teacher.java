package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "teachers")
public class Teacher extends BaseUser {
    private String subjectSpecialization;

    // Constructor
    public Teacher(String id, String name, String password, String email, String subjectSpecialization) {
        super(id, name, password, email);
        this.subjectSpecialization = subjectSpecialization;
    }

    
}
