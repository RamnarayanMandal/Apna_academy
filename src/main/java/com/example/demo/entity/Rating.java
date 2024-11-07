package com.example.demo.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Document(collection = "ratings") // Specify the MongoDB collection
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Rating {
    @Id
    private String ratingId; // Unique identifier for the rating

    @NotBlank
    private String userId;   // ID of the user giving the rating

    @NotBlank
    private String hotelId;  // ID of the hotel being rated

    @NotNull
    private Double rating;    // Numerical rating (e.g., from 1 to 5)

    private String feedback;   // Optional feedback text

    @Override
    public String toString() {
        return "Rating{" +
                "ratingId='" + ratingId + '\'' +
                ", userId='" + userId + '\'' +
                ", hotelId='" + hotelId + '\'' +
                ", rating=" + rating +
                ", feedback='" + feedback + '\'' +
                '}';
    }
}
