package com.example.demo.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

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
    private  String courseId;

    @NotNull
    private String comment;

    @NotNull
    private String userId;

    @Transient // This field won't be saved in the database
    private Object user;

    @Override
    public String toString() {
        return "Comment{" +
                "id='" + id + '\'' +
                ", videoId='" + videoId + '\'' +
                ", courseId='" + courseId + '\'' +
                ", comment='" + comment + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }


}
