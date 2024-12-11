package com.example.demo.service.service;

import com.example.demo.entity.Like;
import com.example.demo.repo.LikeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {
    @Autowired
    LikeRepo repo;


    public List<Like> getLikeByVideoId(String videoId) {
        return repo.getLikeByVideoId(videoId);
    }

    public Like createLike(Like like) {
        // Check if the user has already liked the video
        Optional<Like> existingLike = repo.findByUserIdAndVideoId(like.getUserId(), like.getVideoId());

        if (existingLike.isPresent()) {
            throw new IllegalStateException("User has already liked this video.");
        }

        // Save the new like
        return repo.save(like);
    }


    public Optional<Like> getLikeById(String id) {
        return repo.findById(id);
    }
}
