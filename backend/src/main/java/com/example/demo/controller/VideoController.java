package com.example.demo.controller;

import com.example.demo.entity.Video;
import com.example.demo.service.CloudinaryService;
import com.example.demo.service.service.VideoService;
import org.apache.catalina.filters.ExpiresFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/videos")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping
    public List<Video> getAllVideos() {
        return videoService.getAllVideos();
    }

    @GetMapping("/{videoId}")
    public Video getVideoById(@PathVariable String videoId) {
        return videoService.getVideoById(videoId);
    }


    @PostMapping("/uploadVideo")
    public Video createVideo(@RequestParam String title,
                             @RequestParam String description,
                             @RequestParam String courseId,
                             @RequestParam("thumbnail") MultipartFile thumbnail,
                             @RequestParam Boolean isPublished,
                             @RequestParam("videoFile") MultipartFile videoFile,
                             @RequestParam String teacherId) throws IOException {
        String videoUrl = cloudinaryService.uploadVideo(videoFile);
        String thumbnailUrl = cloudinaryService.uploadFile(thumbnail);
        Video video = new Video();
        video.setTitle(title);
        video.setDescription(description);
        video.setThumbnail(thumbnailUrl);
        video.setIsPublished(isPublished);
        video.setVideoFile(videoUrl);
        video.setCourseId(courseId);
        video.setTeacherId(teacherId);
        return videoService.createVideo(video);
    }

    @DeleteMapping("/{videoId}")
    public String deleteVideo(@PathVariable String videoId) {
        return videoService.deleteVideo(videoId);
    }

    @PutMapping("/{videoId}")
    public Video updateVideo(@PathVariable String videoId, @RequestParam String title,
                             @RequestParam String description, @RequestParam String courseId,
                             @RequestParam("thumbnail") MultipartFile thumbnail,
                             @RequestParam Boolean isPublished,
                             @RequestParam("videoFile") MultipartFile videoFile,
                             @RequestParam String teacherId) throws IOException {
        String videoUrl = cloudinaryService.uploadVideo(videoFile);
        String thumbnailUrl = cloudinaryService.uploadFile(thumbnail);
        Video video = new Video();
        video.setTitle(title);
        video.setDescription(description);
        video.setThumbnail(thumbnailUrl);
        video.setIsPublished(isPublished);
        video.setVideoFile(videoUrl);
        video.setCourseId(courseId);
        video.setTeacherId(teacherId);
        return videoService.updateVideo(videoId, video);

    }


    @GetMapping("/getVideoByCourseId/{courseId}")
    public ResponseEntity<?> GetVideoByCourseId(@PathVariable String courseId) {
        try {
            System.out.println("Received request for courseId: " + courseId); // Log received courseId
            List<Video> videos = (List<Video>) videoService.getVideosByCourseId(courseId);

            if (videos.isEmpty()) {
                System.out.println("No videos found for courseId: " + courseId);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Videos fetched successfully");
            response.put("data", videos);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error fetching video: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}