package com.example.demo.repo;

import com.example.demo.entity.Announcement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnouncementRepo extends MongoRepository<Announcement,String> {
}
