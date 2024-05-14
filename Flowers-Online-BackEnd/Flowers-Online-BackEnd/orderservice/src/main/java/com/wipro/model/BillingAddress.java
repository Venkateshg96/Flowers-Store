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
@Table(name="order_billingAddress")
public class BillingAddress {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column
	private String firstName;
	@Column
	private String lastName;
	@Column
	private String addressLine1;
	@Column
	private String addressLine2;
	
	@Column
	private String mobileNumber;
	
	@Column
	private String landmark;
	@Column
	private String state;
	@Column
	private String country;
	@Column
	private String pincode;
	

}
