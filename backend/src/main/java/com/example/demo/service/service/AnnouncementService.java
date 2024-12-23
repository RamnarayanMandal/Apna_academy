package com.example.demo.service.service;

import com.example.demo.entity.Announcement;
import com.example.demo.repo.AnnouncementRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepo announcementRepo;


    // Create or Update Announcement
    public Announcement saveAnnouncement(Announcement announcement) {
        return announcementRepo.save(announcement);
    }

    // Get all Announcements
    public List<Announcement> getAllAnnouncements() {
        return announcementRepo.findAll();
    }

    // Get Announcement by ID
    public Optional<Announcement> getAnnouncementById(String id) {
        return announcementRepo.findById(id);
    }

    // Delete Announcement by ID
    public void deleteAnnouncementById(String id) {
        announcementRepo.deleteById(id);
    }

    // Update Announcement (For demonstration, we will just save with the same ID)
    public Announcement updateAnnouncement(String id, Announcement announcement) {
        if (announcementRepo.existsById(id)) {
            announcement.setId(id);
            return announcementRepo.save(announcement);
        } else {
            return null;
        }
    }
}
