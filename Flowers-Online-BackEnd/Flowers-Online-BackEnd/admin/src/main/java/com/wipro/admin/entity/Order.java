package com.wipro.admin.entity;

import java.util.Date;
import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
@Data

public class Order {
	
	private long id;
	
	
	private String email;
	
	
	private Double totalCost;
	
	private Date orderDate;
	
	private List<Products> products;
	
	private BillingAddress billingAddress;

}
