package com.example.demo.entity;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonTypeInfo(
	    use = JsonTypeInfo.Id.NAME,
	    include = JsonTypeInfo.As.PROPERTY,
	    property = "type" // Add a "type" field in JSON to specify the subclass
	)
	@JsonSubTypes({
	    @JsonSubTypes.Type(value = Student.class, name = "student"),
	    @JsonSubTypes.Type(value = Teacher.class, name = "teacher"),
	    @JsonSubTypes.Type(value = Admin.class, name = "admin")
	})

@Document
@Getter
@Setter
@NoArgsConstructor
public abstract class BaseUser {
    @Id
    private String id;

    @NotBlank
    private String name;

    @NotBlank
    private String password;

    @Email
    @NotBlank
    private String email;

    // Constructor
    public BaseUser(String id, String name, String password, String email) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
    }

    // Concrete methods
    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

	@Override
	public String toString() {
		return "BaseUser [id=" + id + ", name=" + name + ", password=" + password + ", email=" + email + "]";
	}
}
