package com.example.demo.service.service;

import com.example.demo.entity.NoteBook;
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

    public NoteBook saveNoteBook(NoteBook noteBook) {
        return noteRepo.save(noteBook);
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