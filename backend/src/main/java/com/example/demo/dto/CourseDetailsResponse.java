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
    private Course course;
    private List<Video> videos;
    private List<Exam> exams;
    private List<NoteBook> notebooks;

    // Getters and Setters
    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public List<Video> getVideos() {
        return videos;
    }

    public void setVideos(List<Video> videos) {
        this.videos = videos;
    }

    public List<Exam> getExams() {
        return exams;
    }

    public void setExams(List<Exam> exams) {
        this.exams = exams;
    }

    public List<NoteBook> getNotebooks() {
        return notebooks;
    }

    public void setNotebooks(List<NoteBook> notebooks) {
        this.notebooks = notebooks;
    }
}

