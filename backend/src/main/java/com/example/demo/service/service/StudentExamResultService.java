package com.example.demo.service.service;

import com.example.demo.dto.StudentExamDTO;
import com.example.demo.dto.StudentExamResultDTO;
import com.example.demo.entity.Course;
import com.example.demo.entity.Exam;
import com.example.demo.entity.Student;
import com.example.demo.entity.StudentExamResult;
import com.example.demo.repo.CourseRepo;
import com.example.demo.repo.ExamRepo;
import com.example.demo.repo.StudentExamResultRepository;
import com.example.demo.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StudentExamResultService {

    @Autowired
    private StudentExamResultRepository studentExamResultRepository;
    @Autowired
    private StudentRepo studentRepository;

    @Autowired
    private CourseRepo courseRepository;

    @Autowired
    private ExamRepo examRepository;

    public List<StudentExamResult> getStudentExamResults(String studentId, String examId) {
        return studentExamResultRepository.findByStudentIdAndExamId(studentId,examId);
    }

    public List<StudentExamResultDTO> getResult(String courseId) {
        List<StudentExamResultDTO> resultDTOList = new ArrayList<>();

        // Retrieve course details
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Create a DTO to store the course name
        StudentExamResultDTO studentExamResultDTO = new StudentExamResultDTO();
        studentExamResultDTO.setCourseName(course.getCourseName());

        // Fetch all exams related to this course
        List<Exam> exams = examRepository.findByCourseId(courseId);

        // List to store student exam data
        List<StudentExamDTO> studentExamDTOList = new ArrayList<>();

        // Loop through each exam
        for (Exam exam : exams) {
            List<StudentExamResult> studentExamResults = exam.getStudentExamResults();

            // Loop through each student's exam results for the current exam
            for (StudentExamResult s : studentExamResults) {
                // Check if the student already exists in the list to avoid duplicates
                Optional<StudentExamDTO> existingStudentExamDTO = studentExamDTOList.stream()
                        .filter(studentExamDTO1 -> studentExamDTO1.getStudentId().equals(s.getStudentId()))
                        .findFirst();

                if (!existingStudentExamDTO.isPresent()) {
                    // If the student doesn't exist yet, create a new StudentExamDTO and add exam data
                    StudentExamDTO studentExamDTO = new StudentExamDTO();
                    studentExamDTO.setStudentId(s.getStudentId());

                    // Retrieve the student name from the student repository
                    Student student = studentRepository.findById(s.getStudentId())
                            .orElse(null); // Avoid throwing exception, return null if student not found

                    if (student == null) {
                        System.out.println("Warning: Student with ID " + s.getStudentId() + " not found.");
                        continue; // Skip this student's data if not found
                    }

                    studentExamDTO.setStudentName(student.getName());

                    // Set the exam name
                    studentExamDTO.setExamName(exam.getExamName());

                    // Set the student's exam result details
                    studentExamDTO.setTotalMarks(s.getTotalMarks());
                    studentExamDTO.setDone(s.getDone());
                    studentExamDTO.setIsPassed(s.getIsPassed());

                    // Add the DTO to the list
                    studentExamDTOList.add(studentExamDTO);
                } else {
                    // If the student has already been added, simply update the existing DTO
                    StudentExamDTO existingDTO = existingStudentExamDTO.get();
                    existingDTO.setExamName(exam.getExamName());
                    existingDTO.setTotalMarks(s.getTotalMarks());
                    existingDTO.setDone(s.getDone());
                    existingDTO.setIsPassed(s.getIsPassed());
                }
            }
        }

        // Set the list of student exam data in the result DTO
        studentExamResultDTO.setStudentExams(studentExamDTOList);

        // Add the result DTO to the list of results
        resultDTOList.add(studentExamResultDTO);

        return resultDTOList;
    }


}
