package com.atlas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.atlas.model.Post;
import com.atlas.repository.PostRepository;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post findById(int id) {
        if (!postRepository.existsById(id)) return null;
        return postRepository.findById(id).get();
    }

    public List<Post> findByAuthor(String author) {
        return postRepository.getByAuthor(author);
    }

    public Post create(Post post) {
        return postRepository.save(post);
    }

    public boolean delete(int id) {
        if (!postRepository.existsById(id)) return false;
        postRepository.deleteById(id);
        return true;
    }
}