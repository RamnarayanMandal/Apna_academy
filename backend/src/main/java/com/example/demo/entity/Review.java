package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Document(collection = "Reviews")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    private String id;

    @NotNull
    private String courseId;

    @NotNull
    private String review;

    @NotNull
    private String userId;

    @NotNull
    @Min(1)
    @Max(5)
    private Double rating;

    @Transient // This field won't be saved in the database
    private Object user;

    @Override
    public String toString() {
        return "Review{" +
                "id='" + id + '\'' +
                ", courseId='" + courseId + '\'' +
                ", review='" + review + '\'' +
                ", userId='" + userId + '\'' +
                ", rating=" + rating +
                ", user=" + user +
                '}';
    }
}
