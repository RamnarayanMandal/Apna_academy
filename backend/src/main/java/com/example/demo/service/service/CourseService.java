package com.example.demo.service.service;

import com.example.demo.dto.CourseDetailsResponse;
import com.example.demo.entity.*;
import com.example.demo.repo.*;
import com.example.demo.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private TeacherRepo teacherRepo;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ExamRepo examRepo;

    @Autowired
    private NoteRepo noteRepo;


    @Autowired
    private VideoRepo videoRepo;

    public CourseDetailsResponse getCourseById(String id) {
        Optional<Course> course = courseRepo.findById(id);
        if (!course.isPresent()) {
            throw new RuntimeException("Course not found with ID: " + id);
        }

        // Fetch related entities
        List<Video> videos = videoRepo.getAllVideoByCourseId(id);

        List<Exam> exams = examRepo.findByCourseId(id);

        List<NoteBook> notebooks = noteRepo.findByCourseId(id);



        // Create a response object
        CourseDetailsResponse response = new CourseDetailsResponse();
        response.setCourse(course.get());
        response.setVideos(videos);
        response.setExams(exams);
        response.setNotebooks(notebooks);


        return response;
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
            throw new RuntimeException("Course not found with ID: " + id);       }

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
        existingCourse.setImage(course.getImage());
        return courseRepo.save(existingCourse);
    }


    public String deleteCourse(String id) {
        if (!courseRepo.existsById(id)) {
            throw new RuntimeException("Course not found with ID: " + id);
        }
        courseRepo.deleteById(id);
        return "Course deleted successfully!";
    }


    public Course addStudentToCourse(String studentId, String courseId) {
        Course course = courseRepo.findById(courseId).orElseThrow(() ->
                new RuntimeException("Course with ID " + courseId + " not found"));
        Student student = studentRepo.findById(studentId).orElseThrow(() ->
                new RuntimeException("Student with ID " + studentId + " not found"));

        List<Student> students = course.getStudents();

        if (students == null) {
            students = new ArrayList<>();
        }

        boolean studentExists = students.stream().anyMatch(s -> s.getEmail().equals(student.getEmail()));
        if (!studentExists) {
            students.add(student);
            course.setStudents(students);
        }

        return courseRepo.save(course);
    }

    public Course removeStudentFromCourse(String studentId, String courseId) {
        // Fetch the course by ID
        Course course = courseRepo.findById(courseId).orElseThrow(() ->
                new RuntimeException("Course with ID " + courseId + " not found"));

        // Fetch the student by ID
        Student student = studentRepo.findById(studentId).orElseThrow(() ->
                new RuntimeException("Student with ID " + studentId + " not found"));

        // Get the list of students enrolled in the course
        List<Student> students = course.getStudents();

        if (students != null && !students.isEmpty()) {
            // Check if the student is in the course
            boolean studentExists = students.stream().anyMatch(s -> s.getEmail().equals(student.getEmail()));

            if (studentExists) {
                // Remove the student from the list
                students.removeIf(s -> s.getEmail().equals(student.getEmail()));
                course.setStudents(students); // Update the course with the modified list
            }
        }

        // Save the updated course
        return courseRepo.save(course);
    }


    public List<Course> getCoursesByStudentId(String studentId) {
               Student student = studentRepo.findById(studentId).orElseThrow(() ->
                new RuntimeException("Student with ID " + studentId + " not found"));
               List<Course> AllCourses = courseRepo.findByStudentsId(studentId);

        return AllCourses;
    }

    public Course addTeacherToCourse(String teacherId, String courseId) {

        Course course = courseRepo.findById(courseId).orElseThrow(() ->
                new RuntimeException("Course with ID " + courseId + " not found"));

        Teacher teacher = teacherRepo.findById(teacherId).orElseThrow(() ->
                new RuntimeException("Teacher with ID " + teacherId + " not found"));

        List<Teacher> teachers = course.getTeacher();
        if (teachers == null) {
            teachers = new ArrayList<>();
        }

        boolean teacherExists = teachers.stream().anyMatch(t->t.getEmail().equals(teacher.getEmail()));
        if (!teacherExists) {
            teachers.add(teacher);
            course.setTeacher(teachers);
        }

        return courseRepo.save(course);
    }

    public List<Course> getCoursesByTeacherId(String teacherId){
        return courseRepo.findByTeacherId(teacherId);
    }

    public long totalCourses(){
        return courseRepo.count();
    }

    public Exam UpdateExam(String id, Exam updatedExam) {

        Optional<Course> existingCourse = courseRepo.findById(updatedExam.getCourseId());



        if (!existingCourse.isPresent()) {
            throw new IllegalArgumentException("Course not found");
        }

        Course course = existingCourse.get();

        // Step 2: Find the existing exam within the course's exam list
        Optional<Exam> existingExamOptional = course.getExams().stream()
                .filter(exam -> exam.getId().equals(id))
                .findFirst();

        if (!existingExamOptional.isPresent()) {
            throw new IllegalArgumentException("Exam not found");
        }

        Exam existingExam = existingExamOptional.get();

        // Step 3: Update the exam details
        existingExam.setExamName(updatedExam.getExamName());
        existingExam.setStartTime(updatedExam.getStartTime());
        existingExam.setEndTime(updatedExam.getEndTime());
        existingExam.setDuration(updatedExam.getDuration());
        existingExam.setExamType(updatedExam.getExamType());
        existingExam.setPassingScore(updatedExam.getPassingScore());
        existingExam.setInstructions(updatedExam.getInstructions());
        existingExam.setMaximumMarks(updatedExam.getMaximumMarks());
        existingExam.setFeedback(updatedExam.getFeedback());

        // Step 4: Save the updated course with the modified exam
        courseRepo.save(course);  // Save the course (this implicitly saves the updated exam)

        // Step 5: Return the updated exam
        return existingExam;
    }



    public Course updateExamInCourse(Exam exam) {
        // Fetch the course associated with the exam's courseId
        Optional<Course> existingCourseOpt = courseRepo.findById(exam.getCourseId());

        // Check if the course exists
        if (existingCourseOpt.isEmpty()) {
            throw new IllegalArgumentException("Course not found with ID: " + exam.getCourseId());
        }

        Course existingCourse = existingCourseOpt.get();

        // Find and update the exam in the course
        List<Exam> exams = existingCourse.getExam();
        boolean examFound = false;
        for (int i = 0; i < exams.size(); i++) {
            if (exams.get(i).getId().equals(exam.getId())) {
                exams.set(i, exam); // Update the exam
                examFound = true;
                break;
            }
        }

        if (!examFound) {
            throw new IllegalArgumentException("Exam not found with ID: " + exam.getId());
        }

        // Save the updated course
        Course updatedCourse = courseRepo.save(existingCourse);

        return updatedCourse;
    }

}
