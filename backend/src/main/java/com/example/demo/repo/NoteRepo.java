package com.example.demo.repo;

import com.example.demo.entity.NoteBook;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepo extends MongoRepository<NoteBook, String> {
    List<NoteBook> findNotesByTeacherId (String teacherId);
}
