package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

import java.time.LocalDateTime;

@Document(collection = "videos")
@Data
public class Video {
    @Id
    private String id;
    private String title;
    private String description;
    private String thumbnail;
    private String videoFile;
    private Integer duration;
    private Integer views = 0;
    private Boolean isPublished = true;
    private String teacherId;
    private String courseId;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;


}
