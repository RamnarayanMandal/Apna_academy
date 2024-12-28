package com.example.demo.service.service;

import java.util.List;
import java.util.stream.Collectors;

import com.example.demo.dto.TeacherDTO;
import com.example.demo.entity.Course;
import com.example.demo.repo.CourseRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.Teacher;
import com.example.demo.repo.TeacherRepo;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeacherService {
	
	@Autowired
	private TeacherRepo repo;

	@Autowired
	private CourseRepo courseRepo;

	public List<Teacher> getAllTeacher() {
		return repo.findAll();
	}

	public String deleteTeacherById(String id){
		repo.deleteById(id);
		return "teacher deleted successfully";
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
			if (updatedTeacher.getProfilePicture() != null) {
				existingTeacher.setProfilePicture(updatedTeacher.getProfilePicture());
			}
			if (updatedTeacher.getDateOfBirth() != null) {
				existingTeacher.setDateOfBirth(updatedTeacher.getDateOfBirth());
			}
			if (updatedTeacher.getGender() != null) {
				existingTeacher.setGender(updatedTeacher.getGender());
			}

			// Save the updated teacher entity to the database
			return repo.save(existingTeacher);
		}).orElse(null);  // Return null if the teacher with the given ID doesn't exist
	}


	public long totalTeacher(){
		return repo.count();
	}

	public List<TeacherDTO> getAllTeachersWithCourses() {
		List<Teacher> teachers = repo.findAll(); // Fetch all teachers
		System.out.println("teacher........"+teachers);
		return teachers.stream().map(teacher -> {
			// Fetch courses associated with the current teacher
			List<Course> courses = courseRepo.findByTeacher(teacher);
			System.out.println("courses    "+courses);
			// Return TeacherDTO with courses
			return new TeacherDTO(teacher.getId(), teacher.getName(), teacher.getEmail(), teacher.getSubjectSpecialization(),teacher.getBlock(), courses);
		}).collect(Collectors.toList());
	}

	@Transactional
	public Teacher blockTeacher(String teacherId) {
		// Fetch teacher by ID
		Teacher teacher = repo.findById(teacherId)
				.orElseThrow(() -> new RuntimeException("Teacher not found"));

		// Set the block status to true
		teacher.setBlock(true);

		// Save the teacher in the repository
		repo.save(teacher);

		// Now, query all courses that the teacher is enrolled in
		List<Course> courses = courseRepo.findByTeacher(teacher);

		// Update all courses this teacher is enrolled in
		for (Course course : courses) {
			// Remove the teacher from the course if they are enrolled
			if (course.getTeacher().contains(teacher)) {
				course.getTeacher().remove(teacher);  // Remove the teacher from course's teacher list
				courseRepo.save(course);  // Save the updated course
			}
		}

		return teacher;  // Return the updated student object
	}

	@Transactional
	public Teacher unblockTeacher(String teacherId) {
		// Fetch teacher by ID
		Teacher teacher = repo.findById(teacherId)
				.orElseThrow(() -> new RuntimeException("Teacher not found"));

		// Set the block status to false (unblock)
		teacher.setBlock(false);

		// Save the teacher in the repository
		repo.save(teacher);

		return teacher;  // Return the updated teacher object
	}

}
