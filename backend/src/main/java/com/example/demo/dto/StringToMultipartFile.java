package com.example.demo.dto;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

public class StringToMultipartFile {


    public MultipartFile convertBase64ToMultipartFile(String base64) throws IOException {

        String[] parts = base64.split(",");
        String imageDataString = parts[1]; // The second part contains the Base64 string


        byte[] imageBytes = Base64.getDecoder().decode(imageDataString);


        InputStream inputStream = new ByteArrayInputStream(imageBytes);


        return new CustomMultipartFile(inputStream, imageBytes.length, "image/png", "image.png");
    }


    private static class CustomMultipartFile implements MultipartFile {
        private final InputStream inputStream;
        private final int size;
        private final String contentType;
        private final String originalFilename;

        public CustomMultipartFile(InputStream inputStream, int size, String contentType, String originalFilename) {
            this.inputStream = inputStream;
            this.size = size;
            this.contentType = contentType;
            this.originalFilename = originalFilename;
        }

        @Override
        public String getName() {
            return originalFilename;
        }

        @Override
        public String getOriginalFilename() {
            return originalFilename;
        }

        @Override
        public String getContentType() {
            return contentType;
        }

        @Override
        public boolean isEmpty() {
            return size == 0;
        }

        @Override
        public long getSize() {
            return size;
        }

        @Override
        public byte[] getBytes() throws IOException {
            byte[] bytes = new byte[size];
            inputStream.read(bytes); // Read the InputStream data
            return bytes;
        }

        @Override
        public InputStream getInputStream() throws IOException {
            return inputStream;
        }

        @Override
        public void transferTo(java.io.File dest) throws IOException, IllegalStateException {

        }
    }
}