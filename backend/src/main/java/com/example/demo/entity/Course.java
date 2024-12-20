package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "courses")
public class Course {
    @Id
    private String id;
    private String courseName;
    private String courseCode;
    private String description;
    @DateTimeFormat
    private String startingDate;
    @DateTimeFormat
    private String endDate;
    @DBRef
    private List<Student> students;
    @DBRef
    @JsonIgnore
    private List<NoteBook> notebook=new ArrayList<>();
    @JsonIgnore
    private List<Video> video;
    @JsonIgnore
    private List<Review> review;
    private String adminId;
    @JsonManagedReference
    @DBRef
    private List<Teacher> teacher;
    private String image;
    @JsonIgnore
    private List<Exam> exam;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;


    public Course(String id, String courseName, String courseCode, String description, String startingDate, String endDate, List<Student> students,
                  List<NoteBook> notebook, List<Video> video, List<Review> review,
                  String adminId, List<Teacher> teacher, String image, List<Exam> exam, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.description = description;
        this.startingDate = startingDate;
        this.endDate = endDate;
        this.students = students;
        this.notebook = notebook;
        this.video = video;
        this.review = review;
        this.adminId = adminId;
        this.teacher = teacher;
        this.image = image;
        this.exam = exam;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        return "Course{" +
                "id='" + id + '\'' +
                ", courseName='" + courseName + '\'' +
                ", courseCode='" + courseCode + '\'' +
                ", description='" + description + '\'' +
                ", startingDate='" + startingDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", students=" + students +
                ", notebook=" + notebook +
                ", video=" + video +
                ", review=" + review +
                ", adminId='" + adminId + '\'' +
                ", teacher=" + teacher +
                ", image='" + image + '\'' +
                ", exam=" + exam +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }

    // This method returns the exams list for the course
    public List<Exam> getExams() {
        return this.exam;
    }
}
