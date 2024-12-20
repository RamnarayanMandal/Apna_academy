package com.example.demo.dto;

import com.example.demo.entity.Student;
import com.example.demo.entity.Teacher;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherStudentCourseDTO {
    private String id;
    private String courseName;
    private List<Student> students;
    private List<Teacher> teachers;
    private String image;
}
