package com.atlas.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.atlas.model.Post;

@Repository
public interface PostRepository extends CrudRepository<Post, Integer> {
    List<Post> getByAuthor(String author);
}
