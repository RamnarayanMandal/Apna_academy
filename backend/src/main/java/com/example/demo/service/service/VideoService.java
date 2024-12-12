package com.example.demo.service.service;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Like;
import com.example.demo.entity.Video;
import com.example.demo.repo.CommentRepo;
import com.example.demo.repo.LikeRepo;
import com.example.demo.repo.VideoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VideoService {

    @Autowired
    private VideoRepo videoRepo;

    @Autowired
    LikeRepo likeRepo;

    @Autowired
    CommentRepo commentRepo;

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
    public List<VideoWithLikes> getVideosByCourseId(String courseId) {
        // Fetch all videos for the given courseId
        List<Video> videos = videoRepo.getAllVideoByCourseId(courseId);

        // Map each video to include its like count and comment count
        List<VideoWithLikes> videosWithLikes = videos.stream()
                .map(video -> {
                    // Fetch likes and comments for each video
                    List<Like> likes = likeRepo.getLikeByVideoId(video.getId());
                    List<Comment> comments = commentRepo.getCommentByVideoId(video.getId());

                    return new VideoWithLikes(video, likes.size(), comments.size());
                })
                .collect(Collectors.toList());

        return videosWithLikes;
    }


    public static class VideoWithLikes {
        private Video video;
        private int likeCount;
        private int commentCount;

        public VideoWithLikes(Video video, int likeCount, int commentCount) {
            this.video = video;
            this.likeCount = likeCount;
            this.commentCount = commentCount;
        }

        public Video getVideo() {
            return video;
        }

        public int getLikeCount() {
            return likeCount;
        }

        public int getCommentCount() {
            return commentCount;
        }
    }



    public Video updateVideo(String id, Video video) {
               Video existVideo = videoRepo.findById(id).orElse(null);
        if (existVideo != null) {

            existVideo.setVideoFile(video.getVideoFile());
            if (video.getTitle() != null) existVideo.setTitle(video.getTitle());
            if (video.getDescription() != null) existVideo.setDescription(video.getDescription());
            if (video.getThumbnail() != null) existVideo.setThumbnail(video.getThumbnail());

            return videoRepo.save(existVideo);
        }
        return null;
    }

}
