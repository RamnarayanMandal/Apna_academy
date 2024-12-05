package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "student_exam_results")
public class StudentExamResult {

    @Id
    private String id;
    private String studentId;
    private String courseId;
    private String examId;
    private Double totalMarks;
    private Boolean isPassed;
    private Boolean done;

}