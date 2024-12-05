package com.example.demo.service.service;

import com.example.demo.entity.Video;
import com.example.demo.repo.VideoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VideoService {

    @Autowired
    private VideoRepo videoRepo;

    public List<Video> getAllVideos() {
        return videoRepo.findAll();
    }

    public Video getVideoById(String  id) {
        return videoRepo.findById(id).orElseThrow(() -> new RuntimeException("Video not found"));
    }

    public Video createVideo(Video video) {
        return videoRepo.save(video);
    }

    public String deleteVideo(String id) {
        Video video = videoRepo.findById(id).orElseThrow(() -> new RuntimeException("Video not found"));
        videoRepo.delete(video);
        return "Video deleted successfully";
    }

    public List<Video> getVideosByCourseId(String courseId){
        return videoRepo.getAllVideoByCourseId(courseId);
    }

}
