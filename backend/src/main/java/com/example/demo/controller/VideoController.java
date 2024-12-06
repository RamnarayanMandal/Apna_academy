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
                             @RequestParam String courseId,
                             @RequestParam("thumbnail") MultipartFile thumbnail,
                             @RequestParam Boolean isPublished,
                             @RequestParam("videoFile") MultipartFile videoFile,
                             @RequestParam String teacherId ) throws IOException {
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
    public Video updateVideo(@PathVariable String videoId , @RequestParam String title,
                             @RequestParam String description,  @RequestParam String courseId,
                             @RequestParam("thumbnail") MultipartFile thumbnail,
                             @RequestParam Boolean isPublished,
                             @RequestParam("videoFile") MultipartFile videoFile,
                             @RequestParam String teacherId ) throws IOException{
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
        return videoService.updateVideo(videoId,video);

    }


//Testing
//    @PostMapping("/upload")
//    public String uploadVideo(@RequestParam("videoFile") MultipartFile videoFile) throws IOException {
//        return cloudinaryService.uploadVideo(videoFile);
//    }


}