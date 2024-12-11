package com.example.demo.repo;

import com.example.demo.entity.Like;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepo extends MongoRepository<Like,String> {
    List<Like> getLikeByVideoId(String videoId);

    Optional<Like> findByUserIdAndVideoId(@NotNull String userId, String videoId);
}
