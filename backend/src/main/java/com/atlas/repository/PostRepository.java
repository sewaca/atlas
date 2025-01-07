package com.atlas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.atlas.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> getByAuthor(String author);
}
