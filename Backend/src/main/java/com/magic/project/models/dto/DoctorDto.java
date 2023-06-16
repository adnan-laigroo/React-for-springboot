package com.magic.project.models.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class DoctorDto {

	@NotEmpty(message = "First name is required")
	private String firstName;

	@NotEmpty(message = "Last name is required")
	private String lastName;

	@Email(message = "Invalid email address")
	@NotEmpty(message = "Email is required")
	private String email;


	@Pattern(regexp = "^[0-9]{10}$", message = "Phone number should contain exactly 10 digits")
	@NotEmpty(message = "Phone number is required")
	private String phoneNo;

	@NotEmpty(message = "Speciality is required")
	@Pattern(regexp = "^(Orthopedic|Gynecology|Dermatology|ENT)$", message = "Speciality must be Orthopedic, Gynecology, Dermatology or ENT specialist")
	private String speciality;

	@NotEmpty(message = "Role is required")
	@Pattern(regexp = "^(Doctor|Receptionist)$", message = "Role must be Doctor or Receptionist")
	private String role;

	@NotEmpty(message = "Password is required")
	@Size(min = 8, max = 15, message = "Password must be between 8 and 15 characters")
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).*$", message = "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character")
	private String password;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
