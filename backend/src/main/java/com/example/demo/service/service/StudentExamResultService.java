package com.example.demo.service.service;

import com.example.demo.entity.StudentExamResult;
import com.example.demo.repo.StudentExamResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentExamResultService {

    @Autowired
    private StudentExamResultRepository studentExamResultRepository;

    public List<StudentExamResult> getStudentExamResults(String studentId, String examId) {
        return studentExamResultRepository.findByStudentIdAndExamId(studentId,examId);
    }
}
