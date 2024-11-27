package com.example.demo.entity;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
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

    private String image;
    @DateTimeFormat
    private String startingDate;

    @DateTimeFormat
    private String endDate;

    @DBRef
    private List<Student> students;

    private List<NoteBook> notebook;

    private List<Video> video;

    private List<Review> review;

    private Teacher teacher;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    public Course(String id, String courseName, String courseCode, String description, String image,
                  String startingDate, String endDate, List<Student> students, List<NoteBook> notebook, List<Video> video,
                  List<Review> review, Teacher teacher, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.description = description;
        this.image = image;
        this.startingDate = startingDate;
        this.endDate = endDate;
        this.students = students;
        this.notebook = notebook;
        this.video = video;
        this.review = review;
        this.teacher = teacher;
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
                ", image='" + image + '\'' +
                ", startingDate='" + startingDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", students=" + students +
                ", notebook=" + notebook +
                ", video=" + video +
                ", review=" + review +
                ", teacher=" + teacher +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
