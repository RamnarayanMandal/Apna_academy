package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repo.TeacherRepo;

@Service
public class TeacherService {
	
	@Autowired
	private TeacherRepo repo;

}
