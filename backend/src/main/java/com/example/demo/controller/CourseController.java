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

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private CourseRepo courseRepo;





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
    public ResponseEntity<Course> addCourse(  @RequestParam("courseName") String courseName,
                                              @RequestParam("courseCode") String courseCode,
                                              @RequestParam("description") String description,
                                              @RequestParam("startingDate") String startingDate,
                                              @RequestParam("endDate") String endDate,
                                            @RequestParam("image") MultipartFile image) throws IOException {

        String imageUrl = cloudinaryService.uploadFile(image);
        Course course = new Course();
        course.setCourseCode(courseCode);
        course.setDescription(description);
        course.setCourseName(courseName);
        course.setStartingDate(startingDate);
        course.setEndDate(endDate);
        course.setImage(imageUrl);


        Course createdCourse = courseService.addCourse(course);

        return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable String id, @RequestBody Course course) {
        course.setId(id); // Ensure the ID is set before updating
        Course updatedCourse = courseService.updateCourse(id,course);
        return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable String id) {
        String response = courseService.deleteCourse(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{studentId}/{courseId}")
    public ResponseEntity<Course> addStudentToCourse(@PathVariable String studentId, @PathVariable String courseId) {
        try {
            Course updatedCourse = courseService.addStudentToCourse(studentId,courseId);
            return ResponseEntity.ok(updatedCourse);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/getAllCourses/{studentId}")
    public ResponseEntity<List<Course>> getStudentCourses(@PathVariable String studentId) {
        List<Course> courses = courseRepo.findByStudentsId(studentId);

        if (courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(courses);
    }

    @PutMapping("/teacher/{techaerId}/{courseId}")
    public ResponseEntity<Course> addTeacherToCourse(@PathVariable String techaerId, @PathVariable String courseId) {
        try {
            Course updatedCourse = courseService.addTeacherToCourse(techaerId,courseId);
            return ResponseEntity.ok(updatedCourse);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/teacher/getAllCourses/{TeacherId}")
    public ResponseEntity<List<Course>> getTeacherCourses(@PathVariable String teachertId) {
        List<Course> courses = courseRepo.findByTeacherId(teachertId);

        if (courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(courses);
    }

}
