package com.example.demo.controller;

import com.example.demo.Enum.Role;
import com.example.demo.entity.Announcement;
import com.example.demo.service.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/announcement")
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;


    @PostMapping
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody Announcement announcement) {
        // If roles are not provided, default to both student and teacher
        if (announcement.getRoles() == null || announcement.getRoles().isEmpty()) {
            announcement.setRoles(Set.of(Role.student, Role.teacher)); // Default to both roles
        }

        // Save the announcement
        Announcement savedAnnouncement = announcementService.saveAnnouncement(announcement);
        return new ResponseEntity<>(savedAnnouncement, HttpStatus.CREATED);
    }

    // Get all Announcements
    @GetMapping
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        List<Announcement> announcements = announcementService.getAllAnnouncements();
        return new ResponseEntity<>(announcements, HttpStatus.OK);
    }

    // Get Announcement by ID
    @GetMapping("/{id}")
    public ResponseEntity<Announcement> getAnnouncementById(@PathVariable String id) {
        Optional<Announcement> announcement = announcementService.getAnnouncementById(id);
        return announcement.map(ResponseEntity::ok).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update Announcement by ID
    @PutMapping("/{id}")
    public ResponseEntity<Announcement> updateAnnouncement(@PathVariable String id, @RequestBody Announcement announcement) {
        Announcement updatedAnnouncement = announcementService.updateAnnouncement(id, announcement);
        return updatedAnnouncement != null
                ? new ResponseEntity<>(updatedAnnouncement, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete Announcement by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable String id) {
        Optional<Announcement> announcement = announcementService.getAnnouncementById(id);
        if (announcement.isPresent()) {
            announcementService.deleteAnnouncementById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
