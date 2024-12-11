package com.example.demo.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Document(collection = "Likes")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Like {

    @Id
    private String id;

    private String videoId;

    @NotNull
    @Indexed(unique = true) // Creates a unique index on the `userId` field.
    private String userId;

    private String commentId;

    private boolean liked; // Renamed for better readability.

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

}
