package com.example.demo.controller;

import java.util.List;

import com.example.demo.dto.StudentDTO;
import com.example.demo.dto.TeacherDTO;
import com.example.demo.repo.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Teacher;
import com.example.demo.service.service.TeacherService;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private TeacherService service;

    @Autowired
    private TeacherRepo teacherRepo;

    @GetMapping("/")
    public ResponseEntity<?> getAllTeachers() {
        try {
            List<Teacher> teachers = service.getAllTeacher();
            return ResponseEntity.ok(teachers);
        } catch (Exception e) {
            return new ResponseEntity<>("Error while fetching teachers: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTeacherById(@PathVariable String id) {
        try {
            Teacher teacher = service.getTeacherById(id);
            if (teacher != null) {
                return ResponseEntity.ok(teacher);
            } else {
                return new ResponseEntity<>("Teacher with ID " + id + " not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error while fetching teacher by ID: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<?> getTeacherByEmail(@PathVariable String email) {
        try {
            Teacher teacher = service.getTeacherByEmail(email);
            if (teacher != null) {
                return ResponseEntity.ok(teacher);
            } else {
                return new ResponseEntity<>("Teacher with email " + email + " not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error while fetching teacher by email: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTeacherById(@PathVariable String id, @RequestBody Teacher teacher) {
        try {
            Teacher updatedTeacher = service.updateTeacherById(id, teacher);
            if (updatedTeacher != null) {
                return ResponseEntity.ok(updatedTeacher);
            } else {
                return new ResponseEntity<>("Teacher with ID " + id + " not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error while updating teacher: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/total-teachers")
    public ResponseEntity<Long> getTotalTeachers(){
        return ResponseEntity.ok(service.totalTeacher());
    }

    @GetMapping("/with-courses")
    public List<TeacherDTO> getAllTeachersWithCourses() {
        return service.getAllTeachersWithCourses();
    }

    @PutMapping("/{id}/block")
    public ResponseEntity<String> blockTeacher(@PathVariable String id) {
        return toggleBlockStatus(id, true);
    }

    @PutMapping("/{id}/unblock")
    public ResponseEntity<String> unblockTeacher(@PathVariable String id) {
        return toggleBlockStatus(id, false);
    }

    private ResponseEntity<String> toggleBlockStatus(String id, boolean blockStatus) {
        return teacherRepo.findById(id)
                .map(teacher -> {
                    teacher.setBlock(blockStatus);
                    teacherRepo.save(teacher);
                    return ResponseEntity.ok("teacher " + (blockStatus ? "blocked" : "unblocked") + " successfully.");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
