package com.example.demo.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "questions")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Question {

    @Id
    private String id;
    private String question;
    private String choice1;
    private String choice2;
    private String choice3;
    private String choice4;
    private String correctAnswer;
    private String courseId;
    private double marks;
}
