package com.example.demo.controller;

import com.example.demo.entity.Course;
import com.example.demo.entity.Teacher;
import com.example.demo.repo.CourseRepo;
import com.example.demo.repo.TeacherRepo;
import com.example.demo.service.CloudinaryService;
import com.example.demo.service.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
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

    @Autowired
    private TeacherRepo teacherRepo;

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

    @PostMapping
    public ResponseEntity<Course> addCourse(@RequestParam("courseName") String courseName,
                                            @RequestParam("courseCode") String courseCode,
                                            @RequestParam("description") String description,
                                            @RequestParam("teacherId") String teacherId,
                                            @RequestParam("startingDate") String startingDate,
                                            @RequestParam("endDate") String endDate,
                                            @RequestParam("image") MultipartFile image) throws IOException {

        // Upload image to Cloudinary and get the image URL
        String imageUrl = cloudinaryService.uploadFile(image);

        // Create the new Course object
        Course course = new Course();
        course.setCourseCode(courseCode);
        course.setDescription(description);
        course.setCourseName(courseName);
        course.setStartingDate(startingDate);
        course.setEndDate(endDate);
        course.setImage(imageUrl);

        // Fetch teacher from the database using teacherId
        Teacher teacher = teacherRepo.findById(teacherId).orElseThrow(() ->
                new RuntimeException("Teacher with ID " + teacherId + " not found"));

        // Initialize the teacher list if it's null
        List<Teacher> currentTeachers = course.getTeacher();
        if (currentTeachers == null) {
            currentTeachers = new ArrayList<>(); // Initialize to an empty list
        }

        // Check if the teacher is already in the list
        boolean teacherExists = currentTeachers.stream().anyMatch(existingTeacher -> existingTeacher.getId().equals(teacherId));

        if (!teacherExists) {
            // If teacher is not in the list, add the teacher
            currentTeachers.add(teacher);
        }

        // Set the updated list of teachers to the course
        course.setTeacher(currentTeachers);

        // Save the created course
        Course createdCourse = courseService.addCourse(course);

        // Return the response with the created course
        return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable String id,
                                               @RequestParam("courseName") String courseName,
                                               @RequestParam("courseCode") String courseCode,
                                               @RequestParam("description") String description,
                                               @RequestParam("startingDate") String startingDate,
                                               @RequestParam("endDate") String endDate,
                                               @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        // Fetch the existing course from the database
        Course existingCourse = courseService.getCourseById(id);

        if (existingCourse == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);  // Return 404 if course does not exist
        }

        // Create a new course object and set the fields
        Course course = new Course();
        course.setCourseCode(courseCode);
        course.setDescription(description);
        course.setCourseName(courseName);
        course.setStartingDate(startingDate);
        course.setEndDate(endDate);

        if (image != null && !image.isEmpty()) {
           String imageUrl = cloudinaryService.uploadFile(image);
            course.setImage(imageUrl);
        } else {
            course.setImage(existingCourse.getImage());
        }

        Course updatedCourse = courseService.updateCourse(id, course);
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
        List<Course> courses = courseService.getCoursesByStudentId(studentId);
        if (courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(courses);
    }

    @PutMapping("/teacher/{teacherId}/{courseId}")
    public ResponseEntity<Course> addTeacherToCourse(@PathVariable String teacherId, @PathVariable String courseId) {

        System.out.println( teacherId + courseId);

        try {
            Course updatedCourse = courseService.addTeacherToCourse(teacherId,courseId);
            return ResponseEntity.ok(updatedCourse);
        } catch (RuntimeException ex) {
            
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

        }
    }

    @GetMapping("/teacher/getAllCourses/{teacherId}")
    public ResponseEntity<List<Course>> getTeacherCourses(@PathVariable String teacherId) {
        List<Course> courses = courseService.getCoursesByTeacherId(teacherId);
        if (courses.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(courses);
    }

    @GetMapping("/total-course")
    public ResponseEntity<Long> getTotalCourses(){
        return ResponseEntity.ok(courseService.totalCourses());
    }

}
