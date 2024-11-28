package com.example.demo.controller;

import com.example.demo.entity.Exam;
import com.example.demo.entity.StudentExamResult;
import com.example.demo.service.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    @Autowired
    private ExamService examService;

    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        Exam createdExam = examService.createExam(exam);
        return ResponseEntity.ok(createdExam);
    }

    @PutMapping("/exam/{examId}/student/{studentId}")
    public ResponseEntity<Exam> addStudentToExam(@PathVariable String examId, @PathVariable String studentId) {
       return ResponseEntity.ok(examService.addStudentToExam(examId, studentId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<Exam> getExamByCourseId(@PathVariable String courseId) {
        return ResponseEntity.ok(examService.getExamByCourseId(courseId));
    }

    // Endpoint to fetch exams by courseId and studentId
    @GetMapping("/course/{courseId}/student/{studentId}")
    public List<Exam> getExamsByCourseAndStudent(@PathVariable String courseId, @PathVariable String studentId) {
        return examService.getExamsByCourseAndStudent(courseId, studentId);
    }
    // Endpoint to get exam details by ID (optional)
    @GetMapping("/{examId}")
    public ResponseEntity<Exam> getExamById(@PathVariable String examId) {
        Exam exam = examService.getExamById(examId);
        return ResponseEntity.ok(exam);
    }




    // Endpoint to submit answers for an exam
    @PostMapping("/submit/{examId}")
    public ResponseEntity<StudentExamResult> submitAnswers(
            @PathVariable String examId,
            @RequestBody Map<String, String> submittedAnswers,
            @RequestParam String studentId) {

        // Submit the answers and calculate the score
        StudentExamResult result = examService.submitAnswers(examId, submittedAnswers, studentId);
        return ResponseEntity.ok(result);
    }


}