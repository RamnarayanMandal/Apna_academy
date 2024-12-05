package com.example.demo.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "exams")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Exam {

    @Id
    private String id;
    private String examName;
    private String courseId;

    @DBRef
    private List<Question> questions;
    private Long startTime;  // Exam start time (in milliseconds)
    private Long endTime;  // Exam end time (in milliseconds)

    private List<StudentExamResult> studentExamResults;  // List of student exam results

    private Long duration;  // Duration of the exam in minutes
    private String examType;  // Type of exam (e.g., MCQ, Essay)
    private Double passingScore;  // Minimum passing score
    private String instructions;  // Instructions for the exam
    private Double maximumMarks;  // Maximum possible marks for the exam

    @CreatedDate
    private LocalDateTime createdAt;  // Created timestamp

    @LastModifiedDate
    private LocalDateTime updatedAt;  // Last modified timestamp

    private String feedback;  // Feedback/comments on the exam
}