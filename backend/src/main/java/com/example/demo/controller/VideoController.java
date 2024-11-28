package com.example.demo.controller;

import com.example.demo.entity.Video;
import com.example.demo.service.CloudinaryService;
import com.example.demo.service.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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
                             @RequestParam("thumbnail") MultipartFile thumbnail,  // Handle thumbnail as MultipartFile (image)
                             @RequestParam Boolean isPublished,
                             @RequestParam("videoFile") MultipartFile videoFile,
                             @RequestParam String teacherId) throws IOException {
        // Upload video file to Cloudinary (or your preferred service)
        String videoUrl = cloudinaryService.uploadVideo(videoFile);

        // Upload thumbnail image to Cloudinary (or your preferred service)
        String thumbnailUrl = cloudinaryService.uploadFile(thumbnail);

        // Create a new Video object
        Video video = new Video();
        video.setTitle(title);
        video.setDescription(description);
        video.setThumbnail(thumbnailUrl);  // Set the URL of the uploaded thumbnail image
        video.setIsPublished(isPublished);
        video.setVideoFile(videoUrl);  // Set the URL of the uploaded video file

        // Save video details (using videoService or whatever service you have)
        return videoService.createVideo(video);
    }



    @DeleteMapping("/{videoId}")
    public String deleteVideo(@PathVariable String videoId) {
        return videoService.deleteVideo(videoId);
    }
//Testing
//    @PostMapping("/upload")
//    public String uploadVideo(@RequestParam("videoFile") MultipartFile videoFile) throws IOException {
//        return cloudinaryService.uploadVideo(videoFile);
//    }


}
