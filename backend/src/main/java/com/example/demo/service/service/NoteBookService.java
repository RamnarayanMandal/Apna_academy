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

    public NoteBook saveNoteBookWithPdf(NoteBook noteBook, MultipartFile pdfFile) throws IOException {
        byte[] pdfContent = pdfFile.getBytes();  // Get the PDF content as bytes
        noteBook.setPdfFile(pdfContent);      // Set PDF content to the NoteBook entity
        return noteRepo.save(noteBook);          // Save the note in MongoDB
    }

    // Method to get a note by its ID
    public NoteBook getNoteById(String id) {
        Optional<NoteBook> noteBook = noteRepo.findById(id);
        return noteBook.orElse(null);  // Return null if the note is not found
    }

    public NoteBook getNote(String id){
        return noteRepo.findById(id).get();
    }

    public List<NoteBook> getAllNote(){
        return noteRepo.findAll();
    }

    public String deleteNote(String id){
        noteRepo.deleteById(id);
        return "Note with deleted successfully" ;
    }

    public List<NoteBook> getAllNotesByTeacherId(String teacherId){
        return noteRepo.findNotesByTeacherId(teacherId);
    }

}
