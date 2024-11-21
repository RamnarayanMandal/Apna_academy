package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repo.AdminRepo;
import com.example.demo.repo.TeacherRepo;
import com.example.demo.repo.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private final StudentRepo userRepo;
    private final TeacherRepo teacherRepo;
    private final AdminRepo adminRepo;

    @Autowired
    public MyUserDetailsService(StudentRepo userRepo, TeacherRepo teacherRepo, AdminRepo adminRepo) {
        this.userRepo = userRepo;
        this.teacherRepo = teacherRepo;
        this.adminRepo = adminRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        BaseUser user = userRepo.findByEmail(username);
        if (user == null) {
            user = teacherRepo.findByEmail(username);
        }
        if (user == null) {
            user = adminRepo.findByEmail(username);
        }
        if (user == null) {
            throw new UsernameNotFoundException("User with email '" + username + "' not found");
        }
        return new UserPrincipal(user);
    }
}
