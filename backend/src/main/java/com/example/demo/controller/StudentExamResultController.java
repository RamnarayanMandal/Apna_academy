package com.example.demo.controller;

import com.example.demo.dto.StudentExamResultDTO;
import com.example.demo.service.service.StudentExamResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.entity.StudentExamResult;
import java.util.List;

@RestController()
@RequestMapping("/api/results")
public class StudentExamResultController {

    @Autowired
    private StudentExamResultService studentExamResultService;

    @GetMapping("/{studentId}/{examId}")
    public List<StudentExamResult> getStudentResult(@PathVariable String studentId, @PathVariable String examId) {
        return studentExamResultService.getStudentExamResults(studentId,examId);
    }

    @GetMapping("/student-results/{courseId}")
    public List<StudentExamResultDTO> getStudentResultsByCourseId(@PathVariable String courseId) {
        return studentExamResultService.getResult(courseId);
    }
}
