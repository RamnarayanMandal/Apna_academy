package com.example.demo.service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Teacher;
import com.example.demo.repo.TeacherRepo;

@Service
public class TeacherService {
	
	@Autowired
	private TeacherRepo repo;

	public List<Teacher> getAllTeacher() {
		
		return repo.findAll();
	}

	public Teacher getTeacherById(String id) {
		// TODO Auto-generated method stub
		return repo.findById(id).orElse(null);
	}

	public Teacher getTeacherByEmail(String email) {
		
		return repo.findByEmail(email);
	}

	public Teacher updateTeacherById(String id, Teacher updatedTeacher) {
	    return repo.findById(id).map(existingTeacher -> {
	        // Update only the fields that are not null in the provided object
	        if (updatedTeacher.getName() != null) {
	            existingTeacher.setName(updatedTeacher.getName());
	        }
	        if (updatedTeacher.getEmail() != null) {
	            existingTeacher.setEmail(updatedTeacher.getEmail());
	        }
	        if (updatedTeacher.getSubjectSpecialization() != null) {
	            existingTeacher.setSubjectSpecialization(updatedTeacher.getSubjectSpecialization());
	        }
	        if (updatedTeacher.getPhoneNo() != null) {
	            existingTeacher.setPhoneNo(updatedTeacher.getPhoneNo());
	        }
	        if (updatedTeacher.getAddress() != null) {
	            existingTeacher.setAddress(updatedTeacher.getAddress());
	        }
	        if (updatedTeacher.getQualification() != null) {
	            existingTeacher.setQualification(updatedTeacher.getQualification());
	        }
	        if (updatedTeacher.getCourses() != null) {
	            existingTeacher.setCourses(updatedTeacher.getCourses());
	        }
	         
	        return repo.save(existingTeacher);
	    }).orElse(null); 
	}



	public long totalTeacher(){
		return repo.count();
	}
	
	

}
