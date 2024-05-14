package com.wipro.admin.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data

public class BillingAddress {
	

	private long id;
	
	
	private String firstName;
	
	private String lastName;
	
	private String addressLine1;
	
	private String addressLine2;
	
	
	private String mobileNumber;
	
	
	private String landmark;
	
	private String state;
	
	private String country;
	
	private String pincode;
	

}
