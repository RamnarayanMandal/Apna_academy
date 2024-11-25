package com.example.demo.controller;

import com.example.demo.entity.Course;
import com.example.demo.repo.CourseRepo;
import com.example.demo.service.CloudinaryService;
import com.example.demo.service.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private CloudinaryService cloudinaryService;




    // Get all courses
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    // Get course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        Course course = courseService.getCourseById(id);
        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    // Get course by name
    @GetMapping("/name/{courseName}")
    public ResponseEntity<Course> getCourseByName(@PathVariable String courseName) {
        Course course = courseService.getCourseByName(courseName);
        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    // Add a new course
    @PostMapping
    public ResponseEntity<Course> addCourse(
            @ModelAttribute Course course, // Bind other fields in Course
            @RequestParam("image") MultipartFile image) throws IOException {

        // Upload image to Cloudinary and get the image path (URL)
        String imagePath = cloudinaryService.uploadFile(image);

        // Set the image path to the course object (store the URL as a string)
        course.setImage(imagePath);

        // Save the course to the database
        Course createdCourse = courseService.addCourse(course);

        // Return the created course with HTTP status 201 (Created)
        return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
    }



    // Update an existing course
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable String id, @RequestBody Course course) {
        course.setId(id); // Ensure the ID is set before updating
        Course updatedCourse = courseService.updateCourse(id,course);
        return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
    }

    // Delete a course
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable String id) {
        String response = courseService.deleteCourse(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{studentId}/{courseId}")
    public ResponseEntity<Course> addStudentToCourse(@PathVariable String studentId, @PathVariable String courseId) {
        try {
            Course updatedCourse = courseService.addStudentToCourse(courseId, studentId);
            return ResponseEntity.ok(updatedCourse);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


}
