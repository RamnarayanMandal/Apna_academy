package com.example.demo.repo;


import com.example.demo.entity.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuestionRepo extends MongoRepository<Question, String> {
    List<Question> findByCourseId(String courseId);

}
