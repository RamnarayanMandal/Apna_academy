package com.example.demo.service.service;

import com.example.demo.entity.Course;
import com.example.demo.entity.Student;
import com.example.demo.repo.CourseRepo;
import com.example.demo.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private StudentRepo studentRepo;

    public Course getCourseById(String id) {
        Optional<Course> course = courseRepo.findById(id);
        if (!course.isPresent()) {
            throw new RuntimeException("Course not found with ID: " + id);
        }
        return course.get();
    }

    public Course getCourseByName(String courseName) {
        return courseRepo.findByCourseName(courseName);
    }
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    public Course addCourse(Course course) {
        return courseRepo.save(course);
    }
    public Course updateCourse(String id, Course course) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Course ID cannot be null or empty for updating");
        }

        Optional<Course> existingCourseOpt = courseRepo.findById(id);

        if (!existingCourseOpt.isPresent()) {
            throw new RuntimeException("Course not found with ID: " + id);
        }

        Course existingCourse = existingCourseOpt.get();

        existingCourse.setCourseName(course.getCourseName());
        existingCourse.setCourseCode(course.getCourseCode());
        existingCourse.setDescription(course.getDescription());
        existingCourse.setStartingDate(course.getStartingDate());
        existingCourse.setEndDate(course.getEndDate());
        existingCourse.setStudents(course.getStudents());
        existingCourse.setNotebook(course.getNotebook());
        existingCourse.setVideo(course.getVideo());
        existingCourse.setReview(course.getReview());
        existingCourse.setTeacher(course.getTeacher());

        return courseRepo.save(existingCourse);
    }


    public String deleteCourse(String id) {
        if (!courseRepo.existsById(id)) {
            throw new RuntimeException("Course not found with ID: " + id);
        }
        courseRepo.deleteById(id);
        return "Course deleted successfully!";
    }


    public Course addStudentToCourse(String courseId, String studentId) {
        Course course = courseRepo.findById(courseId).orElseThrow(() ->
                new RuntimeException("Course not found with ID: " + courseId));
        Student student = studentRepo.findById(studentId).orElseThrow(() ->
                new RuntimeException("Student not found with ID: " + studentId));


        if (!course.getStudents().contains(student)) {
            course.getStudents().add(student);
        }

        return courseRepo.save(course);
    }
}
