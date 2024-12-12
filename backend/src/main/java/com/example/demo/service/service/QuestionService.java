package com.example.demo.service.service;

import com.example.demo.entity.Exam;
import com.example.demo.entity.Question;
import com.example.demo.repo.ExamRepo;
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

    @Autowired
    private ExamRepo examRepo;

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

    public Question updateQuestion(String questionId, Question updatedQuestion) {
        // Step 1: Find the existing question
        Question existingQuestion = questionRepo.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        // Step 2: Update the existing question with new values
        existingQuestion.setQuestion(updatedQuestion.getQuestion());
        existingQuestion.setChoice1(updatedQuestion.getChoice1());
        existingQuestion.setChoice2(updatedQuestion.getChoice2());
        existingQuestion.setChoice3(updatedQuestion.getChoice3());
        existingQuestion.setChoice4(updatedQuestion.getChoice4());
        existingQuestion.setCorrectAnswer(updatedQuestion.getCorrectAnswer());

        // Step 3: Save the updated question
        questionRepo.save(existingQuestion);

        // Step 4: Update all exams that reference this question
        updateExamsWithUpdatedQuestion(existingQuestion);

        return existingQuestion;
    }

    private void updateExamsWithUpdatedQuestion(Question updatedQuestion) {
        // Step 5: Find all exams that have this question
        List<Exam> exams = examRepo.findExamsByQuestions(updatedQuestion);

        // Step 6: Update each exam with the updated question information
        for (Exam exam : exams) {
            for (Question question : exam.getQuestions()) {
                if (question.getId().equals(updatedQuestion.getId())) {
                    // Update the question details in the exam
                    question.setQuestion(updatedQuestion.getQuestion());
                    question.setChoice1(updatedQuestion.getChoice1());
                    question.setChoice2(updatedQuestion.getChoice2());
                    question.setChoice3(updatedQuestion.getChoice3());
                    question.setChoice4(updatedQuestion.getChoice4());
                    question.setCorrectAnswer(updatedQuestion.getCorrectAnswer());
                }
            }
            // Step 7: Save the updated exam
            examRepo.save(exam);
        }
    }

}
