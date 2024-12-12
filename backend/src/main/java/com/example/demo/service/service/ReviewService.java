package com.example.demo.service.service;

import com.example.demo.entity.*;
import com.example.demo.repo.AdminRepo;
import com.example.demo.repo.ReviewRepo;
import com.example.demo.repo.StudentRepo;
import com.example.demo.repo.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    StudentRepo studentRepo;

    @Autowired
    TeacherRepo teacherRepo;

    @Autowired
    AdminRepo adminRepo;



    public Review createReview(Review review) {
        return reviewRepo.save(review);
    }

    public List<Review> getReviewByCourseId(String couseId) {

        List<Review> reviews = reviewRepo.findByCourseId(couseId);

        for(Review review: reviews){
            String userId = review.getUserId();
            Object user = findUserById(userId); // Find the user by userId
            review.setUser(user); // Dynamical
        }

        return reviews;

    }

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

    public Review deleteReviewById(String id) {
        return reviewRepo.findById(id)
                .map(review -> {
                    reviewRepo.deleteById(id); // Delete the review
                    return review; // Return the deleted review
                })
                .orElse(null);
    }
}