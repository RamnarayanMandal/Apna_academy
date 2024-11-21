package com.example.demo.repo;

import com.example.demo.entity.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepo extends MongoRepository<Admin, String> {
    Admin findByEmail(String email);
}
