package com.example.demo.controller;

import com.example.demo.entity.*;
import com.example.demo.repo.CourseRepo;
import com.example.demo.repo.TeacherRepo;
import com.example.demo.service.service.CourseService;
import com.example.demo.service.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    @Autowired
    private ExamService examService;
    @Autowired
    private TeacherRepo teacherRepo;
    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private CourseService courseService;
    @PostMapping()
    public ResponseEntity<?> createExam(@RequestBody Exam exam) {
        try {
          Exam Updateexam =  examService.createExam(exam);

          Course updateCourse = courseService.updateExamInCourse(exam);

          if(Updateexam==null && updateCourse == null){
              return new ResponseEntity<>("course and exam is not found ",HttpStatus.NOT_FOUND);
          }

          return new ResponseEntity<>(Updateexam ,HttpStatus.OK);

        }catch (Exception e){
            return new ResponseEntity<>("smothing is wrong while crating the exam:"+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{teacherId}")
    public ResponseEntity<?> createExamThroughTeacher(@RequestBody Exam exam, @PathVariable String teacherId) {
        try {

            if (exam == null) {
                return new ResponseEntity<>("Exam data is missing", HttpStatus.BAD_REQUEST);
            }



            Teacher teacher = teacherRepo.findById(teacherId).orElse(null);

            // Check if the teacher exists
            if (teacher == null) {
                return new ResponseEntity<>("Teacher not found", HttpStatus.NOT_FOUND);
            }

            // Set the teacher for the exam (assuming 'setTeacher' expects a list of teachers)
            exam.setTeacher(Collections.singletonList(teacher));

            // Create the exam
            Exam createdExam = examService.createExam(exam);

            // Update the course with the newly created exam
            Course updatedCourse = courseService.updateExamInCourse(exam);

            // Check if either exam creation or course update failed
            if (createdExam == null || updatedCourse == null) {
                return new ResponseEntity<>("Failed to create exam or update course", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            // Return the created exam in the response
            return new ResponseEntity<>(createdExam, HttpStatus.OK);

        } catch (Exception e) {
            // Handle any unexpected errors
            return new ResponseEntity<>("Something went wrong while creating the exam: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @PutMapping("/exam/{examId}/student/{studentId}")
    public ResponseEntity<Exam> addStudentToExam(@PathVariable String examId, @PathVariable String studentId) {
       return ResponseEntity.ok(examService.addStudentToExam(examId, studentId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Exam>> getExamByCourseId(@PathVariable String courseId) {
        return ResponseEntity.ok(examService.getExamByCourseId(courseId));
    }

    // Endpoint to fetch exams by courseId and studentId
    @GetMapping("/course/{courseId}/student/{studentId}")
    public List<Exam> getExamsByCourseAndStudent(@PathVariable String courseId, @PathVariable String studentId) {
        return examService.getExamsByCourseAndStudent(courseId, studentId);
    }
    // Endpoint to get exam details by ID (optional)
    @GetMapping("/{examId}")
    public ResponseEntity<Exam> getExamById(@PathVariable String examId) {
        Exam exam = examService.getExamById(examId);
        return ResponseEntity.ok(exam);
    }

    // Endpoint to submit answers for an exam
    @PostMapping("/submit/{examId}")
    public ResponseEntity<StudentExamResult> submitAnswers(
            @PathVariable String examId,
            @RequestBody Map<String, String> submittedAnswers,
            @RequestParam String studentId) {

        // Submit the answers and calculate the score
        StudentExamResult result = examService.submitAnswers(examId, submittedAnswers, studentId);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{examId}")
    public ResponseEntity<String> deleteExamById(@PathVariable String examId){
        return new ResponseEntity<>(examService.deleteExam(examId), HttpStatus.OK);
    }

    @GetMapping("/total-exams")
    public ResponseEntity<Long> getTotalExams(){
        return ResponseEntity.ok(examService.totalExams());
    }


    @PostMapping("/{examId}/questions")
    public Exam addQuestionToExam(@PathVariable String examId, @RequestBody List<Question> newQuestion) {
        return examService.addQuestionsToExam(examId, newQuestion);
    }

    @GetMapping("/{id}/questions")
    public ResponseEntity<?> getQuestionsByExamId(@PathVariable String id) {
       Exam exam = examService.getExamById(id);
        if (exam != null) {
            return ResponseEntity.ok(exam.getQuestions());  // Return the list of questions
        } else {
            return ResponseEntity.notFound().build();  // Return 404 if exam is not found
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExam(@PathVariable String id, @RequestBody Exam exam) {
        System.out.println(id);
        System.out.println("exam cntroller"+exam);

        try {
          Exam Updateexam = examService.updateExam(id,exam);

          Exam updateCourse = courseService.UpdateExam(id,exam);

          if(updateCourse == null){
              return  new ResponseEntity<>("exam is not found",HttpStatus.NOT_FOUND);
          }

          return new ResponseEntity<>(updateCourse,HttpStatus.OK);



        } catch (Exception e) {
            return new ResponseEntity <>("somethng is wrong while updating the exam:"+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}



