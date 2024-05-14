package com.wipro.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name= "UserTable")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	private String title;
	
	
	@Column(name="lastname")
	private String lastName;
	
	
	@Column(name="firstname")
	private String firstName;
	
	
	@Column(name="email")
	private String email;
	
	@Column(name="password")
	private String password;
	
	@Column(name="mobilenumber")
	private String mobileNumber;
	
	@Column(name="country")
	private String country;
	
	@Column(name="city")
	private String city;
}
