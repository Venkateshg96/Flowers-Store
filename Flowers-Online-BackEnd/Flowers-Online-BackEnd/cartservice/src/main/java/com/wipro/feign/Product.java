package com.wipro.feign;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
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
