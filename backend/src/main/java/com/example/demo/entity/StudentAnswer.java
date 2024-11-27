package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "student_answers")
public class StudentAnswer {
    private String questionId;
    private String studentResponse;
    private double marks;

    public StudentAnswer(String questionId, String studentResponse, double marks) {
        this.questionId = questionId;
        this.studentResponse = studentResponse;
        this.marks = marks;
    }
}
