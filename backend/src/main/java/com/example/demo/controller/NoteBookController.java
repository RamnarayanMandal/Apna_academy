package com.example.demo.controller;

import com.example.demo.entity.NoteBook;
import com.example.demo.service.service.NoteBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteBookController {
    @Autowired
    private NoteBookService noteBookService;

    @PostMapping("/upload")
    public ResponseEntity<NoteBook> uploadNoteBook(@RequestParam("pdfFile") MultipartFile pdfFile,
                                                   @RequestParam("title") String title,
                                                   @RequestParam("description") String description,
                                                   @RequestParam("content") String content,
                                                   @RequestParam("teacherId") String teacherId,
                                                   @RequestParam("courseId") String courseId) throws IOException {

        // Create a new NoteBook object and set values
        NoteBook noteBook = new NoteBook();
        noteBook.setTitle(title);
        noteBook.setDescription(description);
        noteBook.setContent(content);
        noteBook.setTeacherId(teacherId);  // Set the teacherId
        noteBook.setCourseId(courseId);    // Set the courseId

        // Save the note with the PDF content
        NoteBook savedNoteBook = noteBookService.saveNoteBookWithPdf(noteBook, pdfFile);

        // Return the saved note as a response
        return ResponseEntity.ok(savedNoteBook);
    }

    // Endpoint to update an existing note with a PDF file (if provided)
    @PutMapping("/{id}")
    public ResponseEntity<NoteBook> updateNoteBook(@PathVariable("id") String id,
                                                   @RequestParam("pdfFile") MultipartFile pdfFile,
                                                   @RequestParam("title") String title,
                                                   @RequestParam("description") String description,
                                                   @RequestParam("content") String content,
                                                   @RequestParam("teacherId") String teacherId,
                                                   @RequestParam("courseId") String courseId) throws IOException {

        // Fetch the existing note by ID
        NoteBook existingNoteBook = noteBookService.getNoteById(id);

        if (existingNoteBook == null) {
            return ResponseEntity.notFound().build();
        }

        // Update the fields of the existing noteBook object
        existingNoteBook.setTitle(title);
        existingNoteBook.setDescription(description);
        existingNoteBook.setContent(content);
        existingNoteBook.setTeacherId(teacherId);
        existingNoteBook.setCourseId(courseId);

        // If a new PDF file is uploaded, update it
        if (pdfFile != null && !pdfFile.isEmpty()) {
            existingNoteBook.setPdfFile(pdfFile.getBytes());
        }

        // Save the updated note
        NoteBook updatedNoteBook = noteBookService.saveNoteBookWithPdf(existingNoteBook, pdfFile);

        // Return the updated note as a response
        return ResponseEntity.ok(updatedNoteBook);
    }

    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<NoteBook>> getAllTeacherNotes(@PathVariable String teacherId){
        return new ResponseEntity<>(noteBookService.getAllNotesByTeacherId(teacherId),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteBook> getNoteById(@PathVariable String id){
        return new ResponseEntity<>(noteBookService.getNote(id),HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity<List<NoteBook>> getAllNotes(){
        return new ResponseEntity<>(noteBookService.getAllNote(),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable String id){
        return new ResponseEntity<>(noteBookService.deleteNote(id),HttpStatus.OK);
    }
}
