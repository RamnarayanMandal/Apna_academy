package com.example.demo.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "teachers") // Collection name in MongoDB
public class Teacher extends BaseUser {

    @Field("subject_specialization")
    @NotNull(message = "Subject specialization cannot be null")
    private String subjectSpecialization;

    @Field("phone_no")
    @NotNull(message = "Phone number cannot be null")
    @Size(min = 10, max = 15, message = "Phone number must be between 10 and 15 characters")
    private String phoneNo;

    @Field("address")
    private String address;

    @Field("qualification")
    private String qualification;

    @Field("courses")
    private List<Course> courses; // A list of courses taught by the teacher

    // Full Constructor
    public Teacher(
        String id, 
        String name, 
        String password, 
        String email,
		boolean block,
        String subjectSpecialization, 
        String phoneNo, 
        String address, 
        String qualification, 
        List<Course> courses
    ) {
        super(id, name, password, email,block);
        this.subjectSpecialization = subjectSpecialization;
        this.phoneNo = phoneNo;
        this.address = address;
        this.qualification = qualification;
        this.courses = courses;
    }

    // Utility methods for adding and removing courses
    public void addCourse(Course course) {
        this.courses.add(course);
    }

    public void removeCourse(Course course) {
        this.courses.remove(course);
    }
    
    

	public String getSubjectSpecialization() {
		return subjectSpecialization;
	}

	public void setSubjectSpecialization(String subjectSpecialization) {
		this.subjectSpecialization = subjectSpecialization;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public List<Course> getCourses() {
		return courses;
	}

	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}

	@Override
	public String toString() {
		return "Teacher [subjectSpecialization=" + subjectSpecialization + ", phoneNo=" + phoneNo + ", address="
				+ address + ", qualification=" + qualification + ", courses=" + courses + "]";
	}
}
