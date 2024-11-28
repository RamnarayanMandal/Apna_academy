package com.example.demo.repo;

import com.example.demo.entity.StudentExamResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface StudentExamResultRepository extends MongoRepository<StudentExamResult, String> {
    List<StudentExamResult> findByStudentId(String studentId);
    List<StudentExamResult> findByStudentIdAndExamId(String studentId, String examId);
}