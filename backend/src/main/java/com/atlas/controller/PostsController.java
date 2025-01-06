package com.atlas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.atlas.model.Post;
import com.atlas.service.PostService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/post")
public class PostsController {

    @Autowired
    private PostService postService;

    @GetMapping("/id/{id}")
    public Post byId (@PathVariable int id, HttpServletResponse response) {
        Post post = postService.findById(id);
        if (post == null) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }
        return post;
    }

    @GetMapping("/author/{author}")
    public List<Post> byAuthor (@PathVariable String author) {
        return postService.findByAuthor(author);
    }
    
    @DeleteMapping("/delete/{id}")
    public boolean delete (@PathVariable int id) {
        return postService.delete(id);
    }
}