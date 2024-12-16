package com.example.demo.repo;

import com.example.demo.entity.Course;
import com.example.demo.entity.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepo extends MongoRepository<Student, String> {
    Student findByEmail(String email);

}
