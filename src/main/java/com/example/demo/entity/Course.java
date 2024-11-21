package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "courses")
public class Course {

    private String courseName;
    private String courseCode;
    private String description;
  
    @DateTimeFormat
    private String startingDate;
    
    @DateTimeFormat
    private String endDate;
    
    private List<Student> students; // Many students can enroll in a course
    
    private List<NoteBook> notebook;
    
    private List<Video> video;
    
    private List<Review> review;
    
    
    
    private Teacher teacher; // A course is taught by one teacher
    
   

    // Constructor
    public Course(String courseName, String courseCode, String description, Teacher teacher, List<Student> students) {
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.description = description;
        this.teacher = teacher;
        this.students = students;
    }
}
