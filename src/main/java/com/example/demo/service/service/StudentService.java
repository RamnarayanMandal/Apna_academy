package com.example.demo.service.service;

import com.example.demo.entity.Student;
import com.example.demo.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepo studentRepo;

    public List<Student> findAll() {
        return studentRepo.findAll();
    }

    public Student findById(String id) {
        return studentRepo.findById(id).get();
    }

    public String delete(String id) {
        studentRepo.deleteById(id);
        return "Student deleted";
    }
    public Student update(Student student, String id) {

        Student existingStudent = studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));

        existingStudent.setName(student.getName());
        existingStudent.setAddress(student.getAddress());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());

        return studentRepo.save(existingStudent);
    }
}
