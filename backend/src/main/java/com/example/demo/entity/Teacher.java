package com.example.demo.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;


@NoArgsConstructor
@Setter
@Getter
@Document(collection = "teachers")
public class  Teacher extends BaseUser {

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

	private String profilePicture;
	private String dateOfBirth;
	private String gender;

	public Teacher(String id, String name, String password, String email, Boolean block, String subjectSpecialization,
				   String phoneNo, String address, String qualification, String profilePicture, String dateOfBirth, String gender) {
		super(id, name, password, email, block);
		this.subjectSpecialization = subjectSpecialization;
		this.phoneNo = phoneNo;
		this.address = address;
		this.qualification = qualification;
		this.profilePicture = profilePicture;
		this.dateOfBirth = dateOfBirth;
		this.gender = gender;
	}

	@Override
	public String toString() {
		return "Teacher{" +
				"subjectSpecialization='" + subjectSpecialization + '\'' +
				", phoneNo='" + phoneNo + '\'' +
				", address='" + address + '\'' +
				", qualification='" + qualification + '\'' +
				", profilePicture='" + profilePicture + '\'' +
				", dateOfBirth='" + dateOfBirth + '\'' +
				", gender='" + gender + '\'' +
				'}';
	}
}
