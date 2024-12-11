package com.example.demo.controller;

import com.example.demo.entity.Like;
import com.example.demo.service.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping ("/api/like")
public class LikeController {
    @Autowired
    LikeService service;

    @GetMapping("/viedo/{videoId}")
    public ResponseEntity<?> getLikeByVideoId(@PathVariable String videoId) {
        try {
            List<Like> like = service.getLikeByVideoId(videoId); // Corrected variable name from `VideoId` to `videoId`.

            if (like == null || like.isEmpty()) { // Changed `isEmnty` to `isEmpty`.
                return new ResponseEntity<>("No likes found for the given video ID.", HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(like, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Something went wrong while fetching likes: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/")
   public ResponseEntity<?> CrateLike(@RequestBody Like like){
        try {
          Like likes = service.createLike(like);

          if(likes == null ){
              return new ResponseEntity<>("error is occur while crating like",HttpStatus.NOT_FOUND);


          }
           return new ResponseEntity<>(likes,HttpStatus.OK);

        } catch (Exception e) {
            return new  ResponseEntity<>("Something went wrong while creating like: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/:{id}")
    public ResponseEntity<?> getLikeById(@RequestParam String id){
        try {
            Optional<Like> like = service.getLikeById(id);

            if(like == null ){
                return new ResponseEntity<>("error is occur while fetching like",HttpStatus.NOT_FOUND);


            }

            return new ResponseEntity<>(like,HttpStatus.OK);

        } catch (Exception e) {
            return new  ResponseEntity<>("Something went wrong while fetching like: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
