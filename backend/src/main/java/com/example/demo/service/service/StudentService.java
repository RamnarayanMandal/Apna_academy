package com.example.demo.service.service;

import com.example.demo.dto.StudentDTO;
import com.example.demo.entity.Course;
import com.example.demo.entity.Student;
import com.example.demo.repo.CourseRepo;
import com.example.demo.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {
    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private CourseRepo courseRepo;

    public List<Student> findAll() {
        return studentRepo.findAll();
    }

    public Student findById(String id) {
        return studentRepo.findById(id).get();
    }


    @Transactional
    public String delete(String studentId) {
        try {
            // Remove the student from all courses they are enrolled in
            List<Course> courses = courseRepo.findAll();

            for (Course course : courses) {
                // Remove student from each course's students list
                boolean removed = course.getStudents().removeIf(student -> student.getId().equals(studentId));

                if (removed) {
                    // Save the updated course back to the database
                    courseRepo.save(course);
                }
            }

            // Now delete the student record from the Student collection
            studentRepo.deleteById(studentId);

            return "Student and associated course references deleted successfully!";
        } catch (Exception e) {
            // Log error and rollback if something fails
            e.printStackTrace();
            throw new RuntimeException("Error while deleting student and updating courses", e);
        }
    }
    public Student update(Student student, String id) {

        Student existingStudent = studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        existingStudent.setName(student.getName());
        existingStudent.setAddress(student.getAddress());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setGender(student.getGender());
        existingStudent.setProfilePicture(student.getProfilePicture());
        existingStudent.setDateOfBirth(student.getDateOfBirth());

        return studentRepo.save(existingStudent);
    }

    public List<StudentDTO> getAllStudentsWithCourses() {
        List<Student> students = studentRepo.findAll();

        return students.stream().map(student -> {
            List<Course> courses = courseRepo.findByStudents(student);  // Assuming a method like this exists in your CourseRepository
            return new StudentDTO(student.getId(),student.getName(), student.getEmail(), student.getPhone(),student.getBlock(), courses);
        }).collect(Collectors.toList());
    }

//    public StudentDTO findById(String id) {
//        Optional<Student> optionalStudent = studentRepo.findById(id);
//        if (optionalStudent.isPresent()) {
//            Student student = optionalStudent.get();
//            List<Course> courses = courseRepo.findByStudents(student);
//            StudentDTO studentDTO = new StudentDTO();
//            studentDTO.setId(student.getId());
//            studentDTO.setName(student.getName());
//            studentDTO.setEmail(student.getEmail());
//            studentDTO.setPhone(student.getPhone());
//            studentDTO.setAddress(student.getAddress());
//            studentDTO.setProfilePicture(student.getProfilePicture());
//            studentDTO.setDateOfBirth(student.getDateOfBirth());
//            studentDTO.setGender(student.getGender());
//            studentDTO.setBlock(student.getBlock());
//            studentDTO.setCourse(courses);
//            return studentDTO;
//        } else {
//            return null;
//        }
//    }

    @Transactional
    public Student blockStudent(String studentId) {
        // Fetch student by ID
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Set the block status to true
        student.setBlock(true);

        // Save the student in the repository
        studentRepo.save(student);

        // Now, query all courses that the student is enrolled in
        List<Course> courses = courseRepo.findByStudents(student);

        // Update all courses this student is enrolled in
        for (Course course : courses) {
            // Remove the student from the course if they are enrolled
            if (course.getStudents().contains(student)) {
                course.getStudents().remove(student);  // Remove the student from course's student list
                courseRepo.save(course);  // Save the updated course
            }
        }

        return student;  // Return the updated student object
    }

    @Transactional
    public Student unblockStudent(String studentId) {
        // Fetch student by ID
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Set the block status to false (unblock)
        student.setBlock(false);

        // Save the student in the repository
        studentRepo.save(student);

        return student;  // Return the updated student object
    }

        // Return the updated student object after blocking

    }
