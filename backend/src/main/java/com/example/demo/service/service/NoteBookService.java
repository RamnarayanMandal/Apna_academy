package com.example.demo.service.service;

import com.example.demo.entity.NoteBook;
import com.example.demo.repo.NoteRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteBookService {

    @Autowired
    private NoteRepo noteRepo;


    public NoteBook createNote(NoteBook noteBook){
        return noteRepo.save(noteBook);
    }

    public NoteBook getNote(String id){
        return noteRepo.findById(id).get();
    }

    public List<NoteBook> getAllNote(){
        return noteRepo.findAll();
    }

    public String deleteNote(String id){
        return "Note with deleted successfully" ;
    }

    public NoteBook updateNote(String id, NoteBook noteBook) {
        NoteBook existingNote = noteRepo.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));
        existingNote.setTitle(noteBook.getTitle());
        existingNote.setDescription(noteBook.getDescription());
        existingNote.setContent(noteBook.getContent());
        existingNote.setTeacherId(noteBook.getTeacherId());
        existingNote.setCourseId(noteBook.getCourseId());
        return noteRepo.save(existingNote);
    }
}
