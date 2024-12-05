package com.example.demo.repo;

import com.example.demo.entity.NoteBook;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepo extends MongoRepository<NoteBook, String> {
}
