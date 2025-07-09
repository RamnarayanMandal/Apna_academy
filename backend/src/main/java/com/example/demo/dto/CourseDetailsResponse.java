package com.example.demo.dto;

import com.example.demo.entity.Course;
import com.example.demo.entity.Exam;
import com.example.demo.entity.NoteBook;
import com.example.demo.entity.Video;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CourseDetailsResponse {
    // Getters and Setters
    private Course course;
    private List<Video> videos;
    private List<Exam> exams;
    private List<NoteBook> notebooks;

    public void setCourse(Course course) {
        this.course = course;
    }

    public void setVideos(List<Video> videos) {
        this.videos = videos;
    }

    public void setExams(List<Exam> exams) {
        this.exams = exams;
    }

    public void setNotebooks(List<NoteBook> notebooks) {
        this.notebooks = notebooks;
    }
}

