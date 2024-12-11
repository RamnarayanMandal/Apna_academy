package com.example.demo.service.service;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Student;
import com.example.demo.entity.Teacher;
import com.example.demo.repo.AdminRepo;
import com.example.demo.repo.CommentRepo;
import com.example.demo.repo.StudentRepo;
import com.example.demo.repo.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    CommentRepo repo;

    @Autowired
    StudentRepo studentRepo;

    @Autowired
    TeacherRepo teacherRepo;

    @Autowired
    AdminRepo adminRepo;


    public Comment createComment(Comment comment) {
        return repo.save(comment);
    }

    public List<Comment> getCommentByVideoId(String videoId) {
        List<Comment> comments = repo.getCommentByVideoId(videoId);

        // Iterate through each comment to fetch user details
        for (Comment comment : comments) {
            String userId = comment.getUserId();
            Object user = findUserById(userId); // Find the user by userId
            comment.setUser(user); // Dynamically add user details to the comment
        }

        return comments;
    }

    // Find user by userId across all repositories
    private Object findUserById(String userId) {
        // Check in StudentRepo
        Optional<Student> student = studentRepo.findById(userId);
        if (student.isPresent()) {
            return student.get();
        }

        // Check in TeacherRepo
        Optional<Teacher> teacher = teacherRepo.findById(userId);
        if (teacher.isPresent()) {
            return teacher.get();
        }

        // Check in AdminRepo
        Optional<Admin> admin = adminRepo.findById(userId);
        if (admin.isPresent()) {
            return admin.get();
        }

        // If user not found in any repository
        return null;
    }
}
