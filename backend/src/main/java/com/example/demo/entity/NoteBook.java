package com.example.demo.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection ="notes")
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class NoteBook {
   @Id
   private String id;
   private String title;
   private String description;
   private String content;
   private String teacherId;
   private String courseId;
   private byte[] pdfFile;
   @CreatedDate
   private LocalDateTime createdAt;
   @LastModifiedDate
   private LocalDateTime updatedAt;
}
