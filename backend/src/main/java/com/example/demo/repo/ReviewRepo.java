package com.example.demo.repo;

import com.example.demo.entity.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends MongoRepository<Review,String> {

    List<Review> findByCourseId(String couseId);
}
