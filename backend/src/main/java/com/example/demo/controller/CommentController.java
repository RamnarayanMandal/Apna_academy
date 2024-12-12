package com.example.demo.controller;

import com.example.demo.entity.Comment;
import com.example.demo.service.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    CommentService service;

    @PostMapping("/")
    public ResponseEntity<?> crateComment(@RequestBody Comment comment){
        try {
           Comment comments = service.createComment(comment);

           if(comments==null){
               return new ResponseEntity<>("comment is not Created ",HttpStatus.OK);
           }



           return new ResponseEntity<>( comments,HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Somthing Wrong while create the comment :"+ e.getMessage() , HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/video/{videoId}")
    public ResponseEntity<?> getCommentByVideoId(@PathVariable String videoId){
        try {
           List<Comment> comment = service.getCommentByVideoId(videoId);

           if(comment==null|| comment.isEmpty()){
               return new ResponseEntity<>("Comment is not found",HttpStatus.OK);
           }

           return new ResponseEntity<>(comment,HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Something is woring while fetching the comment:"+e.getMessage(),HttpStatus.OK);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletedCommentById(@PathVariable String id){
        try {
            Comment comment = service.deleteCommentById(id);

            if(comment==null){
                return new ResponseEntity<>("Comment is not found",HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>("Comment is deleted successfully"+comment,HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error is occuring deleting comment:"+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCommentById(@PathVariable String id , @RequestBody Comment comment){
        try {
            Comment UpdateComment = service.UpdateCommentById( id , comment) ;

            if(UpdateComment==null){
                return new ResponseEntity<>("comment is not found ",HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>("comment is Updated successfully"+UpdateComment,HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Something is Wrong While Updating the comment:"+e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
