

package com.atlas.service;


import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class ImageGeneratorService {

  HttpClient httpClient;
  
  private static final String API_URL = "https://ai-image-generator3.p.rapidapi.com/generate";
  private static final String API_HOST = "ai-image-generator3.p.rapidapi.com";
  
  @Value("${rapidapi.key}")
  private String API_KEY;


  public String generateImageUrl(String message) {

    HttpRequest.BodyPublisher body = HttpRequest.BodyPublishers.ofString("{\"prompt\": \""+message+"\",\"size\":\"1024x1024\"}");

    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(API_URL))
        .header("Content-Type", "application/json")
        .header("X-RapidAPI-Key", API_KEY)
        .header("X-RapidAPI-Host", API_HOST)
        .method("POST", body)
        .build();
    
    HttpResponse<String> resp;
    try {
        resp = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
    } catch (IOException | InterruptedException ex) {
        return null;
    }
    
    if (resp.statusCode() != HttpStatus.OK.value()) {return null;}

    return resp.body();
  }

}