package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StudentExamDTO {
    private String examName;
    private Double totalMarks;
    private String StudentId;
    private String studentName;
    private Boolean isPassed;
    private Boolean done;
}
