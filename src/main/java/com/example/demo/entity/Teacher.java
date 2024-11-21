package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "teachers")
public class Teacher extends BaseUser {

    private String subjectSpecialization;
    
    private long phoneNo;
    private String address;
    private String qualification;

    // Relationship: A teacher can teach many courses
    private List<Course> courses;

    // Constructor
    public Teacher(String id, String name, String password, String email, String subjectSpecialization, List<Course> courses) {
        super(id, name, password, email);
        this.subjectSpecialization = subjectSpecialization;
        this.courses = courses;
    }
}
