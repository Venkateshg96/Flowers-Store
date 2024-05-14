package com.wipro.admin.entity;

import java.util.Date;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@AllArgsConstructor
@NoArgsConstructor
@Data

public class Products {
	

		
		private long orderProdutId;
		
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
