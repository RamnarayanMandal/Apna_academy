package com.example.demo.controller;

import com.example.demo.entity.NoteBook;
import com.example.demo.service.service.NoteBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteBookController {
    @Autowired
    private NoteBookService noteBookService;
    @PostMapping
    public ResponseEntity<NoteBook> createNote(@RequestBody NoteBook noteBook){
        return  new ResponseEntity<>(noteBookService.createNote(noteBook), HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<NoteBook> getNoteById(@PathVariable String id){
        return new ResponseEntity<>(noteBookService.getNote(id),HttpStatus.OK);
    }
    @GetMapping()
    public ResponseEntity<List<NoteBook>> getAllNotes(){
        return new ResponseEntity<>(noteBookService.getAllNote(),HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<NoteBook> updateNote(@PathVariable String id, @RequestBody NoteBook noteBook){
        return new ResponseEntity<>(noteBookService.updateNote(id,noteBook),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable String id){
        return new ResponseEntity<>(noteBookService.deleteNote(id),HttpStatus.OK);
    }
}
