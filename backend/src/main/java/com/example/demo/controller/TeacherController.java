package com.example.demo.controller;

import java.io.IOException;
import java.util.List;

import com.example.demo.dto.StudentDTO;
import com.example.demo.dto.TeacherDTO;
import com.example.demo.repo.TeacherRepo;
import com.example.demo.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Teacher;
import com.example.demo.service.service.TeacherService;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/teacher")
public class TeacherController {

    @Autowired
    private TeacherService service;

    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping("/")
    public ResponseEntity<?> getAllTeachers() {
        try {
            List<Teacher> teachers = service.getAllTeacher();
            return ResponseEntity.ok(teachers);
        } catch (Exception e) {
            return new ResponseEntity<>("Error while fetching teachers: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTeacherById(@PathVariable String id) {
        try {
            // Calling service layer to delete the teacher by ID
            String result = service.deleteTeacherById(id);

            // Return success message with HTTP 200 status
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            // Return error message with HTTP 500 status in case of exception
            return new ResponseEntity<>("Error while deleting teacher by ID: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
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


//    @PutMapping("/{id}")
//    public ResponseEntity<?> updateTeacherById(
//            @PathVariable String id,
//            @RequestParam("name") String name,
//            @RequestParam("phoneNo") String phoneNo,
//            @RequestParam("address") String address,
//            @RequestParam(value = "dateOfBirth", required = false) String dateOfBirth,  // Optional
//            @RequestParam("gender") String gender,
//            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture
//    ) throws IOException {
//
//        // Fetch the existing teacher
//        Teacher existingTeacher = teacherRepo.findById(id).get();
//
//        if (existingTeacher == null) {
//            return new ResponseEntity<>("Teacher with ID " + id + " not found", HttpStatus.NOT_FOUND);  // 404 if not found
//        }
//
//        // Update the teacher fields
//        existingTeacher.setName(name);
//        existingTeacher.setPhoneNo(phoneNo);
//        existingTeacher.setAddress(address);
//        existingTeacher.setGender(gender);
//
//        // Handle the optional dateOfBirth
//        if (dateOfBirth != null && !dateOfBirth.isEmpty()) {
//            existingTeacher.setDateOfBirth(dateOfBirth);  // Handle date format conversion if necessary
//        }
//
//        // Handle the profile picture update
//        if (profilePicture != null && !profilePicture.isEmpty()) {
//            String imageUrl = cloudinaryService.uploadFile(profilePicture);  // Assuming a service method to handle file upload
//            existingTeacher.setProfilePicture(imageUrl);
//        }
//        // Save the updated teacher
//        Teacher updatedTeacher = service.updateTeacherById(id, existingTeacher);
//
//        return new ResponseEntity<>(updatedTeacher, HttpStatus.OK);  // Return the updated teacher with 200 status
//    }

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
