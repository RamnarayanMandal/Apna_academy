package com.example.demo.controller;

import com.example.demo.entity.Student;
import com.example.demo.service.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/")
    public List<Student> getAllStudents() {
        return studentService.findAll();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id) {
        return studentService.findById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteStudentById(@PathVariable String id) {
        return studentService.delete(id);
    }
    @PutMapping("/{id}")
    public Student updateStudentById(@PathVariable String id,@RequestBody Student student) {
        return studentService.update(student, id);
    }
}
