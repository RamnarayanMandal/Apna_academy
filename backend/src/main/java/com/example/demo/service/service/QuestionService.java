package com.example.demo.service.service;

import com.example.demo.entity.Question;
import com.example.demo.repo.QuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepo questionRepo;

    public Question saveQuestion(Question question) {
        return questionRepo.save(question);
    }


    public List<Question> getAllQuestions() {
        return questionRepo.findAll();
    }


    public Optional<Question> getQuestionById(String id) {
        return questionRepo.findById(id);
    }


    public void deleteQuestion(String id) {
        questionRepo.deleteById(id);
    }

    public List<Question> getQuestionsByCourseId(String courseId) {
        return questionRepo.findByCourseId(courseId);
    }

}
