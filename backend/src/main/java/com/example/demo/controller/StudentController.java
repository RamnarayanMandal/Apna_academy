package com.example.demo.controller;

import com.example.demo.dto.StudentDTO;
import com.example.demo.entity.Student;
import com.example.demo.repo.StudentRepo;
import com.example.demo.service.CloudinaryService;
import com.example.demo.service.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentRepo studentRepo;
    @GetMapping("/")
    public List<Student> getAllStudents() {
        return studentService.findAll();
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable String id) {
        return studentService.findById(id);
    }
//    @GetMapping("/{id}")
//    public StudentDTO getStudentById(@PathVariable String id) {
//        return studentService.findById(id);
//    }
    @DeleteMapping("/{id}")
    public String deleteStudentById(@PathVariable String id) {
        return studentService.delete(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudentById(
            @PathVariable String id,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("address") String address,
            @RequestParam(value = "dateOfBirth", required = false) String dateOfBirth,  // Make optional
            @RequestParam("gender") String gender,
            @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture
    ) throws IOException {

        Student existingStudent = studentService.findById(id);

        if (existingStudent == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // Return 404 if student does not exist
        }

        // Update the student fields
        existingStudent.setName(name);
        existingStudent.setEmail(email);
        existingStudent.setPhone(phone);
        existingStudent.setAddress(address);
        existingStudent.setGender(gender);

        // Parse the date of birth if provided
        if (dateOfBirth != null && !dateOfBirth.isEmpty()) {
            existingStudent.setDateOfBirth(dateOfBirth);  // Handle date format conversion if necessary
        }

        // Handle profile picture update (if file provided)
        if (profilePicture != null && !profilePicture.isEmpty()) {
            String imageUrl = cloudinaryService.uploadFile(profilePicture);
            existingStudent.setProfilePicture(imageUrl);
        }

        // Save the updated student in the database
        Student updatedStudent = studentService.update(existingStudent, id);

        return new ResponseEntity<>(updatedStudent, HttpStatus.OK);
    }

    @GetMapping("/with-courses")
    public List<StudentDTO> getAllStudentsWithCourses() {
        return studentService.getAllStudentsWithCourses();
    }

    @PutMapping("/{id}/block")
    public ResponseEntity<String> blockStudent(@PathVariable String id) {
        return toggleBlockStatus(id, true);
    }

    @PutMapping("/{id}/unblock")
    public ResponseEntity<String> unblockStudent(@PathVariable String id) {
        return toggleBlockStatus(id, false);
    }

    private ResponseEntity<String> toggleBlockStatus(String id, boolean blockStatus) {
        return studentRepo.findById(id)
                .map(student -> {
                    student.setBlock(blockStatus);
                    studentRepo.save(student);
                    return ResponseEntity.ok("Student " + (blockStatus ? "blocked" : "unblocked") + " successfully.");
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
