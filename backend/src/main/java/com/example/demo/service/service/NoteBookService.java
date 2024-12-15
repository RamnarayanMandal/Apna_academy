package com.example.demo.service.service;

import com.example.demo.entity.Course;
import com.example.demo.entity.NoteBook;
import com.example.demo.repo.CourseRepo;
import com.example.demo.repo.NoteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class NoteBookService {

    @Autowired
    private NoteRepo noteRepo;

    @Autowired
    private CourseRepo courseRepo;

    public NoteBook saveNoteBook(NoteBook noteBook) {
        // Save the NoteBook first
        NoteBook savedNoteBook = noteRepo.save(noteBook);

        // Fetch the Course by the courseId associated with the NoteBook
        Optional<Course> courseOptional = courseRepo.findById(noteBook.getCourseId());
        if (courseOptional.isPresent()) {
            Course course = courseOptional.get();

            // Check if the NoteBook already exists in the Course's notebook list (based on a unique identifier like `id` or `title`)
            boolean notebookExists = course.getNotebook().stream()
                    .anyMatch(existingNoteBook -> existingNoteBook.getId().equals(savedNoteBook.getId()));

            if (!notebookExists) {
                // Add the NoteBook to the Course's notebook list if it doesn't already exist
                course.getNotebook().add(savedNoteBook);
                // Save the updated Course
                courseRepo.save(course);
            }
        }

        // Return the saved NoteBook
        return savedNoteBook;
    }

    public NoteBook getNoteById(String id) {
        Optional<NoteBook> noteBook = noteRepo.findById(id);
        return noteBook.orElse(null); // Fallback to null if not present
    }

    public NoteBook getNote(String id) {
        return noteRepo.findById(id).orElseThrow(() ->
                new IllegalArgumentException("Note with ID " + id + " not found.")
        );
    }

    public List<NoteBook> getAllNote() {
        return noteRepo.findAll();
    }

    public String deleteNote(String id) {
        noteRepo.deleteById(id);
        return "Note deleted successfully";
    }

    public List<NoteBook> getAllNotesByTeacherId(String teacherId) {
        return noteRepo.findNotesByTeacherId(teacherId);
    }
}