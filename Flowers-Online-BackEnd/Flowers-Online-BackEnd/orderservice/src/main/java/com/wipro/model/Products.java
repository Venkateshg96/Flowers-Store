package com.wipro.model;

import java.util.Date;

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
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name="products_orders")
public class Products {
	

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private long orderProdutId;
		
		private long id;
		
		@Column
		private long quantity;
		
		@Column
		private String productName;
		@Column
		private Date date;
		
		@Column
		private String size;
		@Column
		private String category;
		@Column
		private double price;
		
		@Column(columnDefinition = "TEXT")
		private String description;
		
		@Column(columnDefinition = "TEXT")
	    private String imageUrl;

}
