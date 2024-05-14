package com.wipro.admin.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class User {
	
	
	private Long Id;
	
	private String title;
	
	
	private String lastName;
	
	

	private String firstName;
	
	
	
	private String email;
	
	
	private String password;
	
	
	private String mobileNumber;
	
	
	private String country;
	

	private String city;
}
