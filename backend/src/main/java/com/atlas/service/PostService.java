package com.atlas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.atlas.constant.Role;
import com.atlas.model.Post;
import com.atlas.repository.PostRepository;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private ImageGeneratorService imageGeneratorService;

    private final int perpage = 12;

    public Post findById(int id) {
        if (!postRepository.existsById(id)) return null;
        return postRepository.findById(id).get();
    }

    public List<Post> findByAuthor(String author) {
        return postRepository.getByAuthor(author);
    }

    public Post buildPost(String title, String image, String body, String jwt) {
        String username = jwtService.getUserName(jwt);
        if (username == null) return null;

        return Post.builder()
            .title(title)
            .body(body)
            .image(image)
            .author(username)
            .build();
    }

    public Post create(Post post) {
        if (post.getImage().isEmpty()) {
            String generatedImage = imageGeneratorService.generateImageUrl("generate avatar for post with title "+post.getTitle());
            if (generatedImage != null) {
                post.setImage(generatedImage);
            }
        }
        return postRepository.save(post);
    }

    public boolean delete(int id, String jwt) {
        String userrole = jwtService.getUserRole(jwt);
        if (userrole == null || !userrole.equals(Role.ADMIN)) {
            return false;
        }

        if (!postRepository.existsById(id)) return false;
        postRepository.deleteById(id);
        return true;
    }

    public boolean edit(int id, String jwt, String body) {
        String userrole = jwtService.getUserRole(jwt);
        if (userrole == null || !(userrole.equals(Role.ADMIN) || userrole.equals(Role.MANAGER))) {
            return false;
        }
        if (!postRepository.existsById(id)) {
            return false;
        }
        Post postFromDB = postRepository.findById(id).get();
        if (postFromDB == null) {
            return false;
        }
        postFromDB.setBody(body);
        postRepository.save(postFromDB);
        return true;
    }

    public List<Post> getPage(int page) {
        return postRepository.findAll(PageRequest.of(page, perpage)).getContent();
    }
}