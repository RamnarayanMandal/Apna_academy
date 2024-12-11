package com.example.demo.repo;

import com.example.demo.entity.Exam;
import com.example.demo.entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepo extends MongoRepository<Exam, String> {
    List<Exam> findByCourseId(String courseId);

    // Custom query to find an exam by courseId and studentId in studentExamResults
    @Query("{'courseId': ?0, 'studentExamResults.studentId': ?1}")
    List<Exam> findByCourseIdAndStudentId(String courseId, String studentId);


}
