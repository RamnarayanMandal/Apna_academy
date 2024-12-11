package com.example.demo.repo;

import com.example.demo.entity.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepo extends MongoRepository<Comment,String> {
    List<Comment> getCommentByVideoId(String videoId);
}
