package com.example.demo.entity;

import lombok.*;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Document(collection = "comments")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Comment {

    @Id
    private String id;

    @NotNull
    private String videoId;

    @NotNull
    private String courseId;

    @NotNull
    private String comment;

    @NotNull
    private String userId;

    @Transient // This field won't be saved in the database
    private Object user;

    @CreatedDate // Automatically set on creation
    private LocalDateTime createdAt;

    @LastModifiedDate // Automatically updated on modification
    private LocalDateTime updatedAt;

    @Override
    public String toString() {
        return "Comment{" +
                "id='" + id + '\'' +
                ", videoId='" + videoId + '\'' +
                ", courseId='" + courseId + '\'' +
                ", comment='" + comment + '\'' +
                ", userId='" + userId + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
