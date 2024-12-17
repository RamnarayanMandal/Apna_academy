package com.example.demo.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
    private Long startTime;
    private Long endTime;

    private List<StudentExamResult> studentExamResults;

    private Long duration;
    private String examType;
    private Double passingScore;
    private String instructions;
    private Double maximumMarks;

    @DBRef
    private List<Teacher> teacher = new ArrayList<>();  

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private String feedback;

    // Method to get the ID of the first teacher
    public String getTeacherId() {
        if (teacher != null && !teacher.isEmpty()) {
            return teacher.get(0).getId();
        }
        return null;
    }

    // Method to get IDs of all teachers
    public List<String> getTeacherIds() {
        if (teacher != null) {
            return teacher.stream()
                    .map(Teacher::getId)
                    .toList();
        }
        return List.of();
    }
}
