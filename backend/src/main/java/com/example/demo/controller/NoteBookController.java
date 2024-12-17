package com.example.demo.controller;

import com.example.demo.entity.NoteBook;
import com.example.demo.service.CloudinaryService;
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

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public ResponseEntity<NoteBook> uploadNoteBook(@RequestParam("pdfFile") MultipartFile pdfFile,
                                                   @RequestParam("title") String title,
                                                   @RequestParam("description") String description,
                                                   @RequestParam("content") String content,
                                                   @RequestParam("teacherId") String teacherId,
                                                   @RequestParam("courseId") String courseId) throws IOException {

        // Upload the PDF to Cloudinary and get the URL
        String pdfUrl = cloudinaryService.uploadFile(pdfFile);  // Upload the PDF to Cloudinary

        // Create a new NoteBook object and set values
        NoteBook noteBook = new NoteBook();
        noteBook.setTitle(title);
        noteBook.setDescription(description);
        noteBook.setContent(content);
        noteBook.setTeacherId(teacherId);
        noteBook.setCourseId(courseId);
        noteBook.setPdfFileUrl(pdfUrl);  // Set the PDF URL from Cloudinary

        // Save the NoteBook entity to MongoDB
        NoteBook savedNoteBook = noteBookService.saveNoteBook(noteBook);

        // Return the saved NoteBook object as a response
        return ResponseEntity.ok(savedNoteBook);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteBook> updateNoteBook(@PathVariable("id") String id,
                                                   @RequestParam(value = "pdfFile", required = false) MultipartFile pdfFile,
                                                   @RequestParam("title") String title,
                                                   @RequestParam("description") String description,
                                                   @RequestParam("content") String content,
                                                   @RequestParam("teacherId") String teacherId,
                                                   @RequestParam("courseId") String courseId) throws IOException {

        // Fetch the existing NoteBook by ID
        NoteBook existingNoteBook = noteBookService.getNoteById(id);

        if (existingNoteBook == null) {
            return ResponseEntity.notFound().build();
        }

        // If a new PDF is uploaded, update the PDF URL
        String pdfUrl = null;
        if (pdfFile != null && !pdfFile.isEmpty()) {
            pdfUrl = cloudinaryService.uploadFile(pdfFile);  // Upload the new PDF to Cloudinary
        }

        // Update the fields of the existing NoteBook
        existingNoteBook.setTitle(title);
        existingNoteBook.setDescription(description);
        existingNoteBook.setContent(content);
        existingNoteBook.setTeacherId(teacherId);
        existingNoteBook.setCourseId(courseId);
        if (pdfUrl != null) {
            existingNoteBook.setPdfFileUrl(pdfUrl);  // Update the PDF URL
        }

        // Save the updated NoteBook entity
        NoteBook updatedNoteBook = noteBookService.saveNoteBook(existingNoteBook);

        // Return the updated NoteBook object as a response
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

    @GetMapping("/")
    public ResponseEntity<?> getAllNoteBooks() {
        try {
            List<NoteBook> noteBooks = noteBookService.getAllNote();
            if (noteBooks.isEmpty()) {
                return new ResponseEntity<>("No notes found", HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(noteBooks, HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception for debugging (optional if using a logger)
            System.err.println("Error occurred while fetching notes: " + e.getMessage());
            return new ResponseEntity<>("Something went wrong while getting all notes: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
