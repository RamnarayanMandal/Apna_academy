package com.example.demo.dto;

import com.example.demo.entity.Course;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeacherDTO {
    private String id;
    private String name;
    private String email;
    private String subjectSpecialization;
    private Boolean block;
    private List<Course> course;


    @Override
    public String toString() {
        return "TeacherDTO{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", block=" + block +
                ", course=" + course +
                '}';
    }
}
