package com.example.demo.service.service;

import com.example.demo.entity.*;
import com.example.demo.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private StudentExamResultRepository studentExamResultRepository;

    @Autowired
    private CourseRepo courseRepo;

    public Exam createExam(Exam exam) {
        return examRepo.save(exam);
    }




    public StudentExamResult submitAnswers(String examId, Map<String, String> submittedAnswers, String studentId) {

        // Fetch the exam from the repository
        Optional<Exam> examOpt = examRepo.findById(examId);
        if (!examOpt.isPresent()) {
            throw new IllegalArgumentException("Exam not found");
        }
        Exam exam = examOpt.get();

        // Check if the exam belongs to the student
        boolean examBelongsToStudent = exam.getStudentExamResults().stream()
                .anyMatch(result -> result.getStudentId().equals(studentId));

        if (!examBelongsToStudent) {
            throw new IllegalArgumentException("This exam does not belong to the given student.");
        }

        // Fetch the questions related to the exam's courseId using the QuestionRepo
        List<Question> questions = questionRepo.findByCourseId(exam.getCourseId());  // Fetch questions by courseId
        if (questions.isEmpty()) {
            throw new IllegalArgumentException("No questions found for this course.");
        }

        int correctAnswers = 0;
        int totalQuestions = questions.size();

        // Calculate the score based on submitted answers
        for (Question question : questions) {
            String correctAnswer = question.getCorrectAnswer();
            String userAnswer = submittedAnswers.get(question.getId());

            if (correctAnswer != null && correctAnswer.equals(userAnswer)) {
                correctAnswers++;
            }
        }

        // Calculate the percentage score
        double score = (double) correctAnswers / totalQuestions * 100;

        // Determine if the student passed
        boolean isPassed = score >= exam.getPassingScore();

        // Check if the student has already completed the exam
        Optional<StudentExamResult> existingResultOpt = exam.getStudentExamResults().stream()
                .filter(result -> result.getStudentId().equals(studentId))
                .findFirst();

        StudentExamResult studentExamResult;

        if (existingResultOpt.isPresent()) {
            // If the student has an existing result, update it
            studentExamResult = existingResultOpt.get();
            studentExamResult.setTotalMarks(score);
            studentExamResult.setIsPassed(isPassed);
            studentExamResult.setDone(true);  // Mark the exam as completed
        } else {
            // If no result exists, create a new one
            studentExamResult = new StudentExamResult();
            studentExamResult.setStudentId(studentId);
            studentExamResult.setCourseId(exam.getCourseId());
            studentExamResult.setExamId(examId);
            studentExamResult.setTotalMarks(score);
            studentExamResult.setIsPassed(isPassed);
            studentExamResult.setDone(true);  // Mark the exam as completed
        }

        // Save the student exam result
        studentExamResultRepository.save(studentExamResult);

        // Optionally, save the updated exam if you need to persist changes to the exam document
        examRepo.save(exam);  // Only needed if you update any part of the exam itself

        return studentExamResult; //"Your score is: " + score + "%";
    }

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

    public Long totalExams(){
        return examRepo.count();
    }

//    public Exam getExamByStudentId(String studentId) {
//        return
//    }
}
