package com.example.demo.repo;

import com.example.demo.entity.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepo extends MongoRepository<Course, String> {
    public Course findByCourseName(String courseName);
    List<Course> findByStudentsId(String studentId);
}
