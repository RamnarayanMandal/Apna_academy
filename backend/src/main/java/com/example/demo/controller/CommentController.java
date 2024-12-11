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

}
