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
    private ExamService examService;

    @Autowired
    private QuestionRepo questionRepo;
    public List<Question> saveQuestion(List<Question> questions) {
        return questionRepo.saveAll(questions);  // Save a list of questions
    }

    public List<Question> getAllQuestions() {
        return questionRepo.findAll();
    }


    public Optional<Question> getQuestionById(String id) {
        return questionRepo.findById(id);
    }


    public void deleteQuestion(String id) {
        // First remove the question from any associated exams
        examService.removeQuestionFromExams(id);

        // Then delete the question from the question repository
        questionRepo.deleteById(id);
    }

    public List<Question> getQuestionsByCourseId(String courseId) {
        return questionRepo.findByCourseId(courseId);
    }


}
