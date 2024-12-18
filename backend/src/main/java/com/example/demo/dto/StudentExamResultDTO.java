package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class StudentExamResultDTO {
    private String id;
    private String courseName;
    private List<StudentExamDTO> studentExams;

    public StudentExamResultDTO(String id,  String courseName, List<StudentExamDTO> studentExams) {
        this.id = id;

        this.courseName = courseName;
        this.studentExams = studentExams;
    }
}
