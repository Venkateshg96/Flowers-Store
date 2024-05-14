package com.wipro.admin.entity;

import java.util.Date;



import lombok.Data;

@Data

public class Product {
	

	private long id;
	
	

	private long quantity;
	

	private String productName;

	private Date date;
	

	private String size;
	
	private String category;
	
	private double price;
	

	private String description;
	

    private String imageUrl;

}
