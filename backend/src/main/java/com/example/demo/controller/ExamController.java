package com.example.demo.controller;

import com.example.demo.entity.Exam;
import com.example.demo.entity.StudentExamResult;
import com.example.demo.entity.Teacher;
import com.example.demo.repo.TeacherRepo;
import com.example.demo.service.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.actuate.autoconfigure.observation.ObservationProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    @Autowired
    private ExamService examService;
    @Autowired
    private TeacherRepo teacherRepo;

    @PostMapping
    public ResponseEntity<Exam> createExam(
            @RequestParam("examName") String examName,
            @RequestParam("courseId") String courseId,
            @RequestParam("startTime") Long startTime,
            @RequestParam("endTime") Long endTime,
            @RequestParam("duration") Long duration,
            @RequestParam("examType") String examType,
            @RequestParam("passingScore") Double passingScore,
            @RequestParam("maximumMarks") Double maximumMarks,
            @RequestParam("instructions") String instructions,
            @RequestParam("feedback") String feedback,
            @RequestParam String teacherId
    ) {
        // Fetch the teacher using the teacherId
        Teacher teacher = teacherRepo.findById(teacherId).orElseThrow(() ->
                new RuntimeException("Teacher with ID " + teacherId + " not found"));

        // Create a new Exam instance with the provided data
        Exam exam = new Exam();
        exam.setExamName(examName);
        exam.setCourseId(courseId);
        exam.setStartTime(startTime);
        exam.setEndTime(endTime);
        exam.setDuration(duration);
        exam.setExamType(examType);
        exam.setPassingScore(passingScore);
        exam.setMaximumMarks(maximumMarks);
        exam.setInstructions(instructions);
        exam.setFeedback(feedback);

        // Assuming you want to associate the teacher with the exam
        List<Teacher> currentTeachers = exam.getTeacher();  // Get the current list of teachers
        if (currentTeachers == null) {
            currentTeachers = new ArrayList<>();  // Initialize if it's null
        }

        // Check if the teacher is already in the list
        boolean teacherExists = currentTeachers.stream().anyMatch(existingTeacher -> existingTeacher.getId().equals(teacherId));
        if (!teacherExists) {
            // If teacher is not in the list, add the teacher
            currentTeachers.add(teacher);
        }

        // Set the updated list of teachers to the exam
        exam.setTeacher(currentTeachers);

        // Create and save the exam
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
    @GetMapping("/total-exams")
    public ResponseEntity<Long> getTotalExams(){
        return ResponseEntity.ok(examService.totalExams());
    }

}