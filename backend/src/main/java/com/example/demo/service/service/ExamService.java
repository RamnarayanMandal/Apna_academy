package com.example.demo.service.service;

import com.example.demo.entity.*;
import com.example.demo.repo.CourseRepo;
import com.example.demo.repo.ExamRepo;
import com.example.demo.repo.QuestionRepo;
import com.example.demo.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ExamService {

    @Autowired
    private ExamRepo examRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private QuestionRepo questionRepo;

    private CourseRepo courseRepo;

    public Exam createExam(Exam exam) {

        return examRepo.save(exam);
    }


//    public String submitAnswers(String examId, Map<String, String> submittedAnswers, String studentId) {
//
//        Optional<Exam> examOpt = examRepo.findById(examId);
//        if (!examOpt.isPresent()) {
//            throw new IllegalArgumentException("Exam not found");
//        }
//        Exam exam = examOpt.get();
//
//
//        if (exam.getStudentId() != null && !exam.getStudentId().equals(studentId)) {
//            throw new IllegalArgumentException("This exam does not belong to the given student.");
//        }
//
//
//        List<Question> questions = exam.getQuestions();
//        int correctAnswers = 0;
//        int totalQuestions = questions.size();
//
//        for (Question question : questions) {
//            String correctAnswer = question.getCorrectAnswer();
//            String userAnswer = submittedAnswers.get(question.getId());
//
//            if (correctAnswer != null && correctAnswer.equals(userAnswer)) {
//                correctAnswers++;
//            }
//        }
//
//
//        double score = (double) correctAnswers / totalQuestions * 100;
//
//
//        exam.setScore(score);  // Store the score in the exam
//        exam.setDone(true);    // Mark the exam as completed
//        examRepo.save(exam);   // Save the updated exam record
//
//        return "Your score is: " + score + "%";
//    }


    public Exam getExamById(String examId) {
        return examRepo.findById(examId).orElseThrow(() -> new IllegalArgumentException("Exam not found"));
    }

    public Exam getExamByCourseId(String courseId){
        return examRepo.findByCourseId(courseId);
    }


    public List<Exam> getExamsByCourseAndStudent(String courseId, String studentId) {
            return examRepo.findByCourseIdAndStudentId(courseId, studentId);
    }


    public Exam addStudentToExam(String examId, String studentId) {
        // Fetch the exam from the repository
        Exam exam = examRepo.findById(examId).orElseThrow(() ->
                new RuntimeException("Exam with ID " + examId + " not found"));

        // Fetch the student from the repository
        Student student = studentRepo.findById(studentId).orElseThrow(() ->
                new RuntimeException("Student with ID " + studentId + " not found"));

        // Get the list of StudentExamResult from the exam
        List<StudentExamResult> studentExamResults = exam.getStudentExamResults();

        // If the studentExamResults list is null or empty, initialize a new list
        if (studentExamResults == null) {
            studentExamResults = new ArrayList<>();
        }

        // Check if the student is already in the list
        boolean studentExists = studentExamResults.stream()
                .anyMatch(result -> result.getStudentId().equals(student.getId()));

        // If the student is not found, create a new StudentExamResult and add to the list
        if (!studentExists) {
            StudentExamResult newResult = new StudentExamResult();
            newResult.setStudentId(student.getId());
            newResult.setExamId(examId);
            newResult.setCourseId(exam.getCourseId()); // Assuming exam has a courseId
            newResult.setTotalMarks(0.0); // Set initial marks
            newResult.setIsPassed(false); // Set default pass status
            newResult.setDone(false); // Set default 'done' status

            studentExamResults.add(newResult);

            // Update the exam with the new student result
            exam.setStudentExamResults(studentExamResults);

            // Save the updated exam entity
            examRepo.save(exam);
        }

        return exam; // Return the updated exam
    }


//    public Exam getExamByStudentId(String studentId) {
//        return
//    }
}
