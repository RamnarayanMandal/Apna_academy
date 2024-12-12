package com.example.demo.controller;

import com.example.demo.entity.Review;
import com.example.demo.service.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;


    @PostMapping("/")
    public ResponseEntity<?>  createReview(@RequestBody Review review){
        try {

            Review review1 = reviewService.createReview(review);

            if(review1==null){
                return new ResponseEntity<>("something is went wrong at time creating review",HttpStatus.NOT_FOUND);
            }

            return  new ResponseEntity<>("Review is created sucessfully"+review1,HttpStatus.OK);

        } catch (Exception e) {

             return new ResponseEntity<>("An Error occur while creating the Review:"+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/course/{couseId}")
    public ResponseEntity<?> getReviewByCourseId(@PathVariable String couseId){
        try {

            List<Review> reviews = reviewService.getReviewByCourseId(couseId);

            if(reviews.isEmpty()){
                return new ResponseEntity<>("review is not found",HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(reviews,HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("An error occur while geting the review:"+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteReviewById(@PathVariable String id){
        try {
                 Review review =  reviewService.deleteReviewById(id);

                 if(review==null){
                     return  new ResponseEntity<>("review is not found",HttpStatus.NOT_FOUND);
                 }
                 return new  ResponseEntity<>("Review deleting successfully"+review,HttpStatus.OK);

        } catch (Exception e) {
            return  new ResponseEntity<>("An error occur while deleting the review:"+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
