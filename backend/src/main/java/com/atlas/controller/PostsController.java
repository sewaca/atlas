package com.atlas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.atlas.constant.Headers;
import com.atlas.model.Post;
import com.atlas.service.PostService;
import com.atlas.types.PostEditRequest;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.Min;

@RestController
@RequestMapping("/api/post")
public class PostsController {

    @Autowired
    private PostService postService;

    @GetMapping("/get")
    public List<Post> getSeveral(@RequestParam(value = "page", defaultValue = "0") @Min(0) int page) {
        return postService.getPage(page);
    }

    @GetMapping("/id/{id}")
    public Post byId(@PathVariable int id, HttpServletResponse response) {
        Post post = postService.findById(id);
        if (post == null) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return null;
        }
        return post;
    }

    @GetMapping("/author/{author}")
    public List<Post> byAuthor(@PathVariable String author) {
        return postService.findByAuthor(author);
    }

    @DeleteMapping("/delete/{id}")
    public boolean delete(
        @PathVariable int id, 
        @RequestHeader("Authorization") String token, 
        HttpServletResponse response
    ) {
        String jwt = token.substring(Headers.BEARER.length());
        boolean res = postService.delete(id, jwt);
        if (!res) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }
        return res;
    }

    @PostMapping("/edit/{id}")
    public boolean edit(
        @PathVariable int id, 
        @RequestHeader("Authorization") String token, 
        @RequestBody PostEditRequest request, 
        HttpServletResponse response
    ) {
        String jwt = token.substring(Headers.BEARER.length());
        boolean res = postService.edit(id, jwt, request.getBody());
        if (!res) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }
        return res;
    }
}
